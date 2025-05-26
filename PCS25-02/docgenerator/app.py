from flask import Flask, render_template, request
from config import AGREEMENT_CONFIGS
from utils.google_sheets import append_to_sheet
from utils.google_docs import fill_template_and_export
from utils.email_sender import send_email_with_attachment
app = Flask(__name__)



@app.route('/')
def home():
    return render_template('home.html')

@app.route('/ip-agreement')
def ip_form():
    return render_template('form_ip.html')  # IP Agreement Form

@app.route('/partnership-agreement')
def partnership_form():
    return render_template('form_partnership.html')  # Partnership Agreement Form

@app.route('/nda')
def nda_form():
    return render_template('nda.html')  # Partnership Agreement Form

@app.route('/form/<agreement_type>')
def load_form(agreement_type):
    if agreement_type not in AGREEMENT_CONFIGS:
        return "Invalid agreement type", 404
    return render_template(f"form_{agreement_type}.html")

@app.route('/submit/<agreement_type>', methods=["POST"])
def submit(agreement_type):
    if agreement_type not in AGREEMENT_CONFIGS:
        return "Invalid agreement type", 404

    config = AGREEMENT_CONFIGS[agreement_type]
    data = {key: value for key, value in request.form.items()}

    append_to_sheet(config["sheet_id"], data)
    pdf_bytes = fill_template_and_export(config["template_id"], data)
    send_email_with_attachment(
        to_email=data["email"],
        subject=f"Your {agreement_type.capitalize()} Agreement",
        body_text="Please find attached your agreement PDF.",
        attachment_bytes=pdf_bytes
    )

    return render_template("success.html", agreement=agreement_type)

if __name__ == "__main__":
    app.run(debug=True)
