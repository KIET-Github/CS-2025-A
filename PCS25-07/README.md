#PCS25 - 07

*Team Members*

* *Gauri Chugh* (2100290120081 - CS - 8B)
* *Dhruv Gajwani* (2100290120072 - CS - 8B)

*Project Guide*
*Mr. Amit Kumar Singh Sanger* (Assistant Professor, CS)

---

# 📱 Android App Setup Guide

This guide will help you set up and run the Android application from this repository. Whether you're a beginner or an experienced developer, follow the steps below to get started quickly.

---

## 🚀 Prerequisites

Before you begin, ensure you have the following:

- A computer with **Windows, macOS, or Linux**
- **Android Studio** installed (see Step 1 below)
- **Git** installed on your machine
- A mobile device or Android Emulator for testing

---

## 🛠️ Setup Instructions

### ✅ Step 1 - Install Android Studio

If you haven't already, download and install **Android Studio** from the official website:

🔗 [https://developer.android.com/studio](https://developer.android.com/studio)

> Android Studio includes everything you need to start developing Android apps, including the SDK, emulator, and build tools.

---

### 📂 Step 2 - Clone the Repository

Open a terminal (or Git Bash on Windows) and run the following command:

```bash
git clone https://github.com/KIET-Github/CS-2025-A.git
```

---

### 🏗️ Step 3 - Open the Project in Android Studio

- Launch Android Studio.
- Click on "Open an existing project".
- Navigate to the folder where you cloned the repository and select it.
- Let Android Studio sync the Gradle files (this may take a few minutes).

---

### 🔧 Step 4 - Build the Project
Once the project is loaded:
- Android Studio will automatically start building the project.
- If not, you can manually build it by selecting:
  - Build > Make Project or
  - Click the "Make Project" (hammer) icon in the toolbar.

Gradle may take some time to download all necessary dependencies during the first build.

---

### 📱 Step 5 - Run the App
You can run the app using one of the following options:

Option 1: Run on Emulator
- Click on Device Manager in Android Studio and create a virtual device.
- Start the emulator.
- Click the Run (green play) button to launch the app on the emulator.

Option 2: Run on Physical Device
- Connect your Android phone via USB.
- Enable Developer Options and USB Debugging on your device.
- Allow USB debugging when prompted.
- Select your device from the device dropdown in Android Studio and run the app.

---

### 💬 Troubleshooting

- Gradle Sync Issues: Try File > Invalidate Caches / Restart in Android Studio.
- Emulator Not Starting: Ensure your system supports virtualization and it's enabled in BIOS.
- Device Not Detected: Make sure USB drivers are installed (especially on Windows).

---

📄 License

This project is licensed under the MIT License. See the LICENSE file for details.
