{
    "name": "Show all active HQV pull requests",
    "version": "1.0",
    "description": "Shows all active HQV pull requests",
    "manifest_version": 2,

    "content_scripts": [
        {
            "matches": ["$TFSURL$/all-pull-requests"],
            "js": ["./all-pull-requests.min.js"],
            "css": ["./all-pull-requests.css"]
        }
    ]
}