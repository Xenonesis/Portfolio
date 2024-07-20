
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize the Google API client
        gapi.load('client', initClient);

        function initClient() {
            gapi.client.init({
                apiKey: 'YOUR_API_KEY',
                clientId: 'YOUR_CLIENT_ID',
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
                scope: 'https://www.googleapis.com/auth/drive.readonly'
            }).then(() => {
                loadMemories();
            });
        }

        function loadMemories() {
            gapi.client.drive.files.list({
                'pageSize': 10,
                'fields': "nextPageToken, files(id, name, mimeType, thumbnailLink)"
            }).then(function(response) {
                const files = response.result.files;
                const memoriesContainer = document.getElementById('memories-container');
                if (files && files.length > 0) {
                    files.forEach(file => {
                        const img = document.createElement('img');
                        img.src = file.thumbnailLink;
                        img.alt = file.name;
                        memoriesContainer.appendChild(img);
                    });
                } else {
                    memoriesContainer.innerHTML = '<p>No memories found.</p>';
                }
            });
        }
    });
    