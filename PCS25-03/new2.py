import streamlit as st
import pickle
import pandas as pd
from PyPDF2 import PdfReader
    
# Load models
with open('clas.pkl', 'rb') as f:
    classifier = pickle.load(f)
with open('vecti.pkl', 'rb') as f:
    vectorizer = pickle.load(f)
with open('scorepred.pkl', 'rb') as f:
    rf = pickle.load(f)

# Skill sets
basic_web_dev_skills = [
    "HTML5", "CSS3", "JavaScript", "DOM Manipulation", "Responsive Web Design",
    "Flexbox", "CSS Grid", "Media Queries", "Git", "GitHub",
    "Bootstrap", "AJAX", "JSON", "RESTful APIs",
    "Chrome DevTools", "VS Code", "NPM",
    "HTTP", "HTTPS", "Cookies", "Sessions",
    "Local Storage", "Session Storage"
]
intermediate_web_dev_skills = [
    "TypeScript", "Sass", "Tailwind CSS", "Material UI", "React.js", "Vue.js",
    "Next.js", "Node.js", "Express.js", "MongoDB", "MySQL", "PostgreSQL", "SQLite",
    "JWT", "OAuth2", "WebSockets", "GraphQL", "OAuth", "Helmet.js", "Axios",
    "Figma", "Postman", "Swagger", "Docker", "GitLab", "Bitbucket",
    "Webpack", "Babel", "Jest", "Mocha", "Chai", "GitLab CI", "Cypress",
    "Firebase Auth", "Firebase Hosting", "Netlify", "Heroku", "Render",
    "WordPress", "Joomla", "Tailwind UI", "Responsive Design Patterns", 
    "Lazy Loading", "Image Optimization", "SEO Basics", "ESLint", "Prettier"
]
advanced_web_dev_skills = [
    "Angular", "AngularJS", "Svelte", "Nuxt.js", "SvelteKit", "NestJS",
    "Koa.js", "FastAPI", "Django", "Flask", "Ruby on Rails", "Spring Boot",
    "Redis", "Firebase Realtime DB", "Firestore", "Hasura", "AWS", "Azure",
    "Google Cloud Platform", "Kubernetes", "Terraform", "Ansible", "CI/CD",
    "Jenkins", "GitHub Actions", "Travis CI", "CircleCI", "Vite", "Framer Motion",
    "GSAP", "Testing Library", "Playwright", "Puppeteer", "Helmet.js",
    "Rate Limiting", "OWASP Top 10", "SSL/TLS", "Serverless Computing",
    "AWS Lambda", "Auth0", "OAuth 2.0", "Contentful", "Sanity", "Strapi",
    "Headless CMS", "Astro", "Gatsby", "Hugo", "Jekyll", "Eleventy", "Docusaurus",
    "Caching Strategies", "Tree Shaking", "Code Splitting", "GraphQL Subscriptions",
    "Advanced Web Performance Optimization", "Component Design Systems", "Micro-Frontend Architecture"
]
basic_data_science_skills = [
    "Python", "R", "SQL", "Excel", "NumPy", "Pandas", "Matplotlib", "Seaborn",
    "Data Cleaning", "Data Manipulation", "Data Visualization",
    "Statistics Fundamentals", "Probability", "Mean", "Median", "Mode", "Standard Deviation",
    "Data Types", "Control Structures", "Functions", "Loops", "Conditionals",
    "Jupyter Notebook", "Google Colab", "CSV Handling", "Basic Exploratory Data Analysis (EDA)"
]
intermediate_data_science_skills = [
    "Scikit-learn", "Regression Models", "Classification Models", "Clustering (KMeans, DBSCAN)",
    "Dimensionality Reduction (PCA, t-SNE)", "Feature Engineering", "Model Evaluation Metrics",
    "Cross Validation", "Train-Test Split", "Grid Search", "Hyperparameter Tuning",
    "Natural Language Processing (NLP)", "Text Preprocessing", "TF-IDF", "Bag of Words",
    "Time Series Analysis", "ARIMA", "Holt-Winters", "EDA Automation", "Plotly", "Bokeh",
    "Dash", "Power BI", "Tableau", "MySQL", "MongoDB", "SQLite",
    "Version Control (Git)", "Agile Concepts", "Data Storytelling", "Business Intelligence",
    "Machine Learning Algorithms", "ROC Curve", "Confusion Matrix", "Precision-Recall"
]
advanced_data_science_skills = [
    "Deep Learning", "TensorFlow", "Keras", "PyTorch", "CNNs", "RNNs", "LSTMs", "GANs",
    "Transformer Models", "Hugging Face Transformers", "BERT", "GPT", "Word Embeddings",
    "NLP Model Deployment", "Model Interpretability (SHAP, LIME)", "Docker", "FastAPI", "Flask",
    "MLOps", "MLflow", "Kubeflow", "Airflow", "Model Drift Monitoring", "Pipeline Automation",
    "Big Data Technologies (Hadoop, Spark, Hive)", "Data Warehousing", "Google BigQuery",
    "Cloud Platforms (AWS, Azure, GCP)", "S3", "Redshift", "Athena", "Azure ML Studio",
    "Data Lakes", "Data Versioning (DVC)", "Data Governance", "Anomaly Detection",
    "Reinforcement Learning", "AutoML", "Ensemble Methods (Stacking, Boosting, Bagging)",
    "XGBoost", "LightGBM", "CatBoost", "Advanced SQL", "NoSQL Optimization",
    "Parallel Computing", "GPU Acceleration", "Bayesian Statistics", "A/B Testing",
    "Survival Analysis", "Recommendation Systems", "Knowledge Graphs",
    "Edge ML", "Streaming Data Analysis (Kafka, Flink)"
]
all_skills=[
    # Programming Languages
    "C", "C++", "Java", "Python", "JavaScript", "TypeScript", "Kotlin", "Scala", "Rust", "Go", "Perl", "Ruby", "Julia", "Shell Scripting",

    # Java Developer Specific
    "Core Java", "Java SE", "Java EE", "Spring", "Spring Boot", "Spring MVC", "Spring Security", "Spring Cloud", "Hibernate",
    "JPA", "JSP", "Servlets", "Maven", "Gradle", "JUnit", "TestNG", "Mockito", "JDBC", "Log4j", "Apache Kafka", "Thymeleaf",
    "Lombok", "JavaFX", "Swing", "Struts", "SLF4J", "Quartz Scheduler", "JAXB", "JMS", "Java Web Services", "Java Applets",
    "Java Security APIs", "Java Collections Framework", "Multithreading", "Concurrency", "Exception Handling",
    "Garbage Collection", "JVM Internals", "Design Patterns (Singleton, Factory, Observer, Builder)", "OOPs",

    # Web & Full Stack
    "HTML", "CSS", "SASS", "Bootstrap", "Tailwind CSS", "React.js", "Angular.js", "Vue.js", "Next.js", "Node.js", "Express.js",
    "AJAX", "jQuery", "JSON", "REST", "GraphQL", "WebSockets", "API Gateway", "JWT", "OAuth2", "Session Management",

    # Backend Frameworks & Languages
    "Flask", "Django", "FastAPI", "Ruby on Rails", "ASP.NET", "NestJS", "Laravel", "Symfony", "Go Fiber", "Phoenix (Elixir)",

    # Databases
    "SQL", "NoSQL", "MySQL", "PostgreSQL", "SQLite", "MongoDB", "Cassandra", "Redis", "DynamoDB", "Oracle", "Neo4j", "Elasticsearch",
    "InfluxDB", "Firebase", "CouchDB", "ClickHouse", "Apache HBase", "Amazon Aurora", "Cloud Firestore",

    # Tools & Build Systems
    "Git", "GitHub", "GitLab", "Bitbucket", "SVN", "Maven", "Gradle", "Ant", "SonarQube", "Jenkins", "Nexus", "Artifactory",

    # Cloud Platforms
    "AWS", "Azure", "Google Cloud", "Heroku", "Firebase", "DigitalOcean", "Oracle Cloud", "IBM Cloud",

    # Cloud Services & Skills
    "AWS EC2", "AWS Lambda", "S3", "VPC", "CloudWatch", "CloudFormation", "Elastic Beanstalk", "RDS", "DynamoDB",
    "IAM", "KMS", "Elastic Load Balancer", "Azure Functions", "Azure Blob Storage", "Google Cloud Functions",
    "Google BigQuery", "Google Cloud Storage", "Serverless Computing", "Terraform", "Ansible", "Vagrant",

    # DevOps & CI/CD
    "CI/CD", "Docker", "Kubernetes", "Jenkins", "GitHub Actions", "GitLab CI", "ArgoCD", "Helm", "Istio", "OpenShift",
    "Monitoring (Prometheus, Grafana)", "ELK Stack", "Splunk", "Nagios", "Sentry", "New Relic",

    # Testing
    "JUnit", "Mockito", "TestNG", "Cucumber", "Selenium", "Playwright", "Cypress", "Postman", "JMeter", "Appium",
    "Robot Framework", "TDD", "BDD",

    # Data Science & ML
    "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "TensorFlow", "Keras", "PyTorch", "NLP", "Text Mining",
    "Sentiment Analysis", "MLflow", "OpenCV", "AutoML", "Deep Learning", "Neural Networks", "CNNs", "RNNs", "GANs",
    "Reinforcement Learning", "XGBoost", "LightGBM", "CatBoost", "Hugging Face",

    # Data Engineering
    "ETL Pipelines", "Apache Airflow", "Apache Kafka", "Apache NiFi", "Apache Beam", "dbt", "Hadoop", "Hive", "Spark",
    "Snowflake", "Data Warehousing", "Data Lake", "Delta Lake", "DataBricks", "Apache Superset",

    # Mobile Development
    "Android", "iOS", "Flutter", "React Native", "Kotlin", "Swift", "Jetpack Compose", "Xamarin", "Ionic",

    # Cybersecurity
    "Ethical Hacking", "Cryptography", "OWASP", "Penetration Testing", "Burp Suite", "Metasploit", "Kali Linux", "Wireshark",
    "SSL/TLS", "OAuth", "Zero Trust", "SIEM", "SOC", "Firewall Config", "Cyber Forensics", "IAM", "SAST/DAST Tools",

    # Other APIs/Protocols
    "SOAP", "gRPC", "OAuth2", "JWT", "WebSockets", "JSON-RPC", "Thrift",

    # UI/UX
    "Figma", "Adobe XD", "InVision", "Sketch", "UI/UX Principles", "Material UI", "Chakra UI",

    # Project & Process
    "Agile", "Scrum", "Kanban", "Waterfall", "JIRA", "Trello", "Confluence", "Project Management", "Risk Management",

    # General/Soft/Bonus
    "Communication", "Problem Solving", "Time Management", "Teamwork", "Technical Writing", "Presentation Skills",
    "PowerPoint", "Documentation Tools", "MS Excel", "Prezi", "Stakeholder Communication", "Leadership",

    # Misc Tools & Services
    "Swagger", "Postman", "Insomnia", "Fiddler", "Charles Proxy", "Notion", "Slack", "Zoom SDK", "REST Assured",
    "Apache Camel", "Apache Tomcat", "WildFly", "GlassFish", "Jetty",

    # Civil/Mechanical/Other Engineering Tools (if needed)
    "STAAD Pro", "ETABS", "AutoCAD", "Revit", "SolidWorks", "ANSYS", "MATLAB", "Simulink", "Primavera", "CATIA", "CREO",
]


# Category mapping
category_map = {
    1: "Data Science Engineer",
    2: "HR",
    3: "Advocate",
    4: "Arts",
    5: "Web Developer",
    6: "Mechanical Engineer",
    7: "Sales",
    8: "Health And Fitness",
    9: "Civil Engineer",
    10: "Web Developer",
    11: "Business Analyst",
    12: "SAP",
    14: "Electrical Engineer"
}

# PDF Text Extractor
def extract_text_from_pdf(pdf_file):
    reader = PdfReader(pdf_file)
    return "".join(page.extract_text() or "" for page in reader.pages)

# Label Resolver
def get_category_label(pred):
    return category_map.get(pred, "Unknown Category")

# Classifier
def predict_category(text):
    tfidf = vectorizer.transform([text])
    pred = classifier.predict(tfidf)[0]
    return get_category_label(pred)

# Title
st.title("ML Based Resume Classifier(Resupro)")

# Session state init
if "predicted_category" not in st.session_state:
    st.session_state.predicted_category = None
if "resume_text" not in st.session_state:
    st.session_state.resume_text = ""

# Input
input_method = st.radio("Choose Input Method", ["Upload PDF", "Enter Text"])
resume_text = ""

if input_method == "Upload PDF":
    uploaded_file = st.file_uploader("Upload PDF Resume", type="pdf")
    if uploaded_file:
        resume_text = extract_text_from_pdf(uploaded_file)
        st.session_state.resume_text = resume_text
        st.text_area("Extracted Resume Text", resume_text, height=200)
else:
    resume_text = st.text_area("Paste Resume Text Here", height=200)
    st.session_state.resume_text = resume_text

# Predict Resume Category
category=""
if st.button("Predict Resume Category"):
    if st.session_state.resume_text.strip():
        category = predict_category(st.session_state.resume_text)
        st.session_state.predicted_category = category
    else:
        st.warning("Please upload or enter resume text first.")

# Show classification result if available
if st.session_state.predicted_category:
    st.success(f"Predicted Resume Category: **{st.session_state.predicted_category}**")

    # Score Prediction Section
    st.subheader("Resume Score Predictor")

    experience = st.number_input("Years of Experience", min_value=0, max_value=30, step=1)
    score=0
    # Select skills based on category
    if "Web Developer" in st.session_state.predicted_category:
        Medium_skills = intermediate_web_dev_skills
        Advanced_skills = advanced_web_dev_skills
        selected_skills = st.multiselect("Select Your Intermediate Web Skills", Medium_skills)
        advselected_skills=st.multiselect("Select Your Advanced Web Skills", Advanced_skills)
        other_skills = st.text_input("Other Skills (comma-separated)", "")
        company_type = st.selectbox("Company Type", ["Startup", "Mid-size", "Enterprise"])
        company_value = {"Startup": 0, "Mid-size": 1, "Enterprise": 2}[company_type]
        total_skills = 2+ len(selected_skills) + 1.5*len(advselected_skills)+ (1 if other_skills else 0)
        if st.button("Predict Resume Score"):
            df = pd.DataFrame([[experience, total_skills, company_value]],
                                      columns=["Experience in Years", "Number of Skills", "Type of Company"])
            score = rf.predict(df)[0]
            st.success(f"Predicted Resume Score: **{(score / 12) * 100:.2f}**")
    elif "Data Science" in st.session_state.predicted_category:
        Medium_skills = intermediate_data_science_skills
        Advanced_skills = advanced_data_science_skills
        selected_skills = st.multiselect("Select Your Intermediate Data Science Skills", Medium_skills)
        advselected_skills=st.multiselect("Select Your Advanced Data Science Skills", Advanced_skills)
        other_skills = st.text_input("Other Skills (comma-separated)", "")
        company_type = st.selectbox("Company Type", ["Startup", "Mid-size", "Enterprise"])
        company_value = {"Startup": 0, "Mid-size": 1, "Enterprise": 2}[company_type]
        total_skills = 2+ len(selected_skills) + 1.5*len(advselected_skills)+ (1 if other_skills else 0)
        if st.button("Predict Resume Score"):
            df = pd.DataFrame([[experience, total_skills, company_value]],
                                      columns=["Experience in Years", "Number of Skills", "Type of Company"])
            score = rf.predict(df)[0]
            st.success(f"Predicted Resume Score: **{(score / 12) * 100:.2f}**")
    else:
        skills = all_skills

        selected_skills = st.multiselect("Select Your Skills", skills)
        other_skills = st.text_input("Other Skills (comma-separated)", "")
        company_type = st.selectbox("Company Type", ["Startup", "Mid-size", "Enterprise"])
        company_value = {"Startup": 0, "Mid-size": 1, "Enterprise": 2}[company_type]
        total_skills = len(selected_skills) + (1 if other_skills else 0)
    
        if st.button("Predict Resume Score"):
            if total_skills < 4:
                st.warning("Please select at least 4 skills.")
            else:
                df = pd.DataFrame([[experience, total_skills, company_value]],
                                  columns=["Experience in Years", "Number of Skills", "Type of Company"])
                score = rf.predict(df)[0]
                st.success(f"Predicted Resume Score: **{(score / 12) * 100:.2f} / 100**")
    
   
    
