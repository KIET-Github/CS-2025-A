# **Solution to Prevent Copyright Infringement/Piracy/Plagiarism of NCERT Textbooks**

**Project Title:** Solution to Prevent Copyright Infringement/Piracy/Plagiarism of NCERT Textbooks  
**Project ID:** PCS25-16  
**Project Description:**  
The unauthorized reproduction and plagiarism of NCERT textbooks persist as a significant challenge, threatening the integrity of educational content. Current efforts lack a robust tool to identify pirated publications based on paper characteristics, such as watermarks, paper quality, and text formatting. The absence of an effective solution allows for the proliferation of unauthorized reproductions, necessitating a comprehensive tool capable of scanning and verifying the authenticity of NCERT textbooks across various publishers, whether accessed through mobile phones, other devices, or inputted files. This gap highlights the critical need for a solution to prevent copyright infringement and plagiarism of NCERT textbooks.

**Team:**  
- Shantanu Mishra (2100290120152)  
- Rajiv Kumar Singh (2100290120137)
- Raunak Jain (2100290120140)

**Project Mentor:**  
- Dr. Ajay Kumar Shrivastava

## **Overview**

This project presents a comprehensive tool designed to detect and prevent copyright infringement, piracy, and plagiarism in NCERT textbooks. Our solution integrates both manual and AI-based verification processes, ensuring that publishers can verify the authenticity of their books while offering a cost-effective alternative to existing solutions.

## **Features**

- **Comprehensive Four-Step Verification for Publishers:**
  1. **Step 1: Copyright Law Compliance**  
     - Ensures that the book does not violate copyright laws and checks agreements and licensing requirements for publishers.
  2. **Step 2: Manual Book Verification**  
     - Manually verifies the paper quality and checks for the NCERT watermark on all pages.
  3. **Step 3: AI-Based Plagiarism Detection**  
     - Utilizes a deep learning model based on BERT and Transformer architectures to detect plagiarism in the book's content.
  4. **Step 4: Certified Report Generation**  
     - Generates a certified plagiarism report, with a threshold set by NCERT, beyond which the book is not allowed to be published.

- **Single-Step Plagiarism Detection for Users:**  
  - Users can opt for step 3 alone, performing a quick plagiarism check without generating a certified report.

- **Interactive LLM Integration:**  
  - Powered by the Llama 3.1 model, users can interact with the tool to ask questions or resolve queries related to plagiarism detection.

- **Cost-Effective Solution:**  
  - Provides a highly accurate plagiarism detection tool at a fraction of the cost compared to existing solutions.

- **Exclusive NCERT Training Data:**  
  - The tool's AI models are exclusively trained on NCERT textbooks, ensuring unmatched accuracy for this specific dataset.

## **User Authentication: Login/Sign-Up Usage**

Our platform requires both users and publishers to authenticate via a secure login or sign-up process. This ensures that only authorized users can access the tool and its features.

### **Sign-Up Process**

1. **Navigate to the Sign-Up Page:**
   - Open the application and click on the "Sign Up" button.
   - You will be directed to the sign-up page.

2. **Provide Necessary Details:**
   - **For Users:**
     - Enter your full name, email address, and create a secure password.
     - Provide additional details such as phone number if required.
   - **For Publishers:**
     - In addition to the above, enter your Publisher ID and other verification details.
     - You will also need to upload documents for cross-verification with NCERT to confirm your status as an authorized publisher.

3. **Verification:**
   - After submitting your details, you will receive a verification email.
   - Click the verification link in the email to confirm your account.

4. **Account Activation:**
   - Once verified, your account will be activated, and you can log in using your credentials.

### **User Roles and Access**

- **Users:**
  - Can access the plagiarism detection tool.
  - Able to interact with the LLM for queries related to plagiarism.
  - Monitor their plagiarism check history and reports.
  
- **Publishers:**
  - In addition to user features, publishers can access the full four-step verification process.
  - Can generate certified reports that verify the authenticity of NCERT textbooks.
  - Have access to detailed analytics and reports to monitor their submissions.

### **Prerequisites**
- Python 3.7 or higher
- PyTorch
- Transformers library
- Other dependencies listed in `requirements.txt`

### **Setup**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/ncert-plagiarism-detection.git
   cd ncert-plagiarism-detection
