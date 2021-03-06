const projUrl = '$TFSURL$/{proj}';
const prUrl = '$TFSURL$/{proj}/_git/{repo}/pullrequest/{pr}';

const fetchPrs = async () => {
    const projRes = await fetch('$TFSURL$/_apis/projects?api-version=2.0');
    const projs = await projRes.json();

    const projObjs = projs.value;

    projObjs.sort((a, b) => {
        if (a.name == b.name) {
            return 0;
        }

        return a.name > b.name ? 1 : -1;
    });

    return Promise.all(projObjs.map(async proj => {
        const prsRes = await fetch(`$TFSURL$/${proj.id}/_apis/git/pullrequests`);
        const prs = await prsRes.json();
        let prObjs = [];

        if (prs.value) {
            prObjs = await Promise.all(prs.value.map(async pr => {
                const prCommitsRes = await fetch(`${pr.url}/commits`)
                const prCommits = await prCommitsRes.json();
                const lastCommitDate = (prCommits.value && prCommits.value.length) ? moment(prCommits.value[0].author.date) : moment(pr.creationDate);

                const updatedDate = moment(lastCommitDate);
                const dateDiffDays = moment().diff(updatedDate, 'days');

                return {
                    name: pr.title,
                    author: pr.createdBy.displayName,
                    dateObj: updatedDate,
                    date: updatedDate.format('YYYY-MM-DD HH:MM'),
                    overdueDays: dateDiffDays,
                    overdueStatus: dateDiffDays > 10 ? 'ancient' : (dateDiffDays > 7 ? 'old' : (dateDiffDays > 4 ? 'overdue' : (dateDiffDays > 2 ? 'due' : 'current'))),
                    url: prUrl.replace('{proj}', proj.name).replace('{repo}', pr.repository.name).replace('{pr}', pr.pullRequestId),
                    source: pr.sourceRefName.replace('refs/heads/', ''),
                    target: pr.targetRefName.replace('refs/heads/', '')
                };
            }));

            prObjs.sort((a, b) => b.dateObj.diff(a.dateObj, 'days'));
        }

        return {
            name: proj.name,
            numPrs: prObjs.length,
            url: projUrl.replace('{proj}', proj.name),
            pr: prObjs
        };
    }));
};

(async () => {
    document.body.innerHTML = 'Loading..';

    const projPrs = await fetchPrs();

    const data = {
        projects: projPrs
    };

    document.body.innerHTML = Handlebars.templates.layout(data);
})();