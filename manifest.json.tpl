{
    "name": "Show all active tfs pull requests across projects",
    "version": "1.0",
    "description": "Shows all active tfs pull requests across projects",
    "manifest_version": 2,

    "content_scripts": [
        {
            "matches": ["$TFSURL$/all-pull-requests"],
            "js": ["./all-pull-requests.min.js"],
            "css": ["./all-pull-requests.css"]
        }
    ]
}