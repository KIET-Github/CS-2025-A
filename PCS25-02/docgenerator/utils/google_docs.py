from googleapiclient.discovery import build
from google.oauth2 import service_account
import os
import base64

# Create credentials from base64 string stored in environment variable
def get_google_credentials():
    encoded_creds = os.getenv("GOOGLE_CREDENTIALS_BASE64")
    if not encoded_creds:
        raise Exception("Missing GOOGLE_CREDENTIALS_BASE64 environment variable.")
    
    credentials_json = base64.b64decode(encoded_creds).decode("utf-8")
    
    # Write to a temporary file
    with open("temp_credentials.json", "w") as f:
        f.write(credentials_json)
    
    creds = service_account.Credentials.from_service_account_file(
        "temp_credentials.json",
        scopes=[
            "https://www.googleapis.com/auth/documents",
            "https://www.googleapis.com/auth/drive"
        ]
    )

    return creds

def fill_template_and_export(template_id, data_dict):
    creds = get_google_credentials()
    
    docs_service = build("docs", "v1", credentials=creds)
    drive_service = build("drive", "v3", credentials=creds)

    # Step 1: Copy the template
    copy = drive_service.files().copy(
        fileId=template_id,
        body={"name": f"Agreement - {data_dict.get('partner1', 'Client')}"}
    ).execute()
    doc_id = copy.get("id")

    # Step 2: Replace placeholders
    requests = [{
        "replaceAllText": {
            "containsText": {
                "text": f"{{{{{key}}}}}",  # Matches {{key}} format
                "matchCase": True
            },
            "replaceText": value
        }
    } for key, value in data_dict.items()]

    docs_service.documents().batchUpdate(
        documentId=doc_id,
        body={"requests": requests}
    ).execute()

    # Step 3: Export to PDF
    pdf_content = drive_service.files().export_media(
        fileId=doc_id,
        mimeType="application/pdf"
    ).execute()

    return pdf_content
