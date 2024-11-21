import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:translator/translator.dart';

import '../auth_controller.dart';

final translator = GoogleTranslator();

class LanguageController extends GetxController with StateMixin {
  final AuthController _auth = Get.find<AuthController>();
  // List<String> languageCode = <String>['en', 'hi', 'ja', 'ko'];
  // var trans2 = [];
  var oldlan = 'hi';
  var translatedText = [
    "Your child's Progress", //0
    "45 minutes spent today", //1
    "15% Progress", //2
    "Community Forum", //3
    "Move on to the world's largest community of parents", //4
    "278 Unread Messages", //5
    "Need Expert Guidence?", //6
    "Read articles on various topics written by experts from around the globe", //7
    "10 Unread Articles", //8
    "Physical Health", //9
    "Check out exercies you can do with your child", //10
    "30 minutes spent today", //11
    "Mental Health", //12
    "Let us help you with your child's mental issues", //13
    "15 question asked", //14
    "Timeline", //15
    "Let the growth timeline speak for your child's activites", //16
    "30 minutes spent today", //17
    "Parental Controls", //18
    "Monitor your child's screentime and other activities", //19
    "30 minutes spent today", //20
    "Hello Parent", //21
    "Mate", //22
    "Home", //23
    "Community", //24
    "Profile", //25
    "Settings", //26
    "For Specially Abled", //27
    "Change Kid's Name", //28
    "Ente Your Child Name", //29
    "Change Password For Child Mode", //30
    "Current Password", //31
    "New Password", //32
    "Wrong Current Password", //33
    "Watch Tutorial Again", //34
    "'Want Doctor Advice", //35
    "Search Child Specialist in your Area With their Contact Info", //37
    "2 Contacts Added", //38
    "", //39
    "",
    "", //35
    "", //37
    "", //38
    "", //39
    "", //40
  ];
  // List<String> translatedText;
  late SharedPreferences _prefs;
  saveStringValue2() async {
    // await trans();
    _prefs = await SharedPreferences.getInstance();
    await _prefs.setStringList('items', translatedText);
    // print(translatedText);
  }

  retrieveStringValue2() async {
    _prefs = await SharedPreferences.getInstance();
    // final List<String>? items = await _prefs.getStringList('items');
    // trans2 = await items as List<String>;
    // print(trans);
    print(_prefs.getString('language'));

    await Future.delayed(const Duration(seconds: 1));
    trans();

    // setState(() {});
  }

  bool isloading = true;
  trans() async {
    change(null, status: RxStatus.loading());
    translatedText[22] = await resultTranslate(
        _auth.getUser() == null ? " " : _auth.getUser()!.displayName as String);
    translatedText[27] = await resultTranslate("For Specially Abled");

    translatedText[0] = await resultTranslate("Your child's Progress");

    translatedText[1] = await resultTranslate("45 minutes spent today");
    translatedText[2] = await resultTranslate("15% Progress");
    translatedText[3] = await resultTranslate("Community Forum");
    translatedText[4] = await resultTranslate(
        "Move on to the world's largest community of parents");
    translatedText[5] = await resultTranslate("278 Unread Messages");
    translatedText[6] = await resultTranslate("Need Expert Guidence?");
    translatedText[7] = await resultTranslate(
        "Read articles on various topics written by experts from around the globe");
    translatedText[8] = await resultTranslate("10 Unread Articles");
    translatedText[9] = await resultTranslate("Physical Health");
    translatedText[10] =
        await resultTranslate("Check out exercies you can do with your child");
    translatedText[11] = await resultTranslate("30 minutes spent today");
    translatedText[12] = await resultTranslate("Mental Health");
    translatedText[13] = await resultTranslate(
        "Let us help you with your child's mental issues");
    translatedText[14] = await resultTranslate("15 question asked");
    translatedText[15] = await resultTranslate("Timeline");
    translatedText[16] = await resultTranslate(
        "Let the growth timeline speak for your child's activites");
    translatedText[17] = await resultTranslate("30 minutes Spent today");

    translatedText[18] = await resultTranslate("Parental Controls");
    translatedText[19] = await resultTranslate(
        "Monitor your child's screentime and other activities");
    translatedText[20] = await resultTranslate("30 minutes spent today");
    translatedText[21] = await resultTranslate("Hello Parent");
    translatedText[23] = await resultTranslate("Home");
    translatedText[24] = await resultTranslate("Community");
    translatedText[25] = await resultTranslate("Profile");
    translatedText[26] = await resultTranslate("Settings");
    translatedText[28] = await resultTranslate("Change Kid's Name");
    translatedText[29] = await resultTranslate("Enter Your Child Name");
    translatedText[30] =
        await resultTranslate("Change Password For Child Mode");
    translatedText[31] = await resultTranslate("Current Password");
    translatedText[32] = await resultTranslate("New Password");
    translatedText[33] = await resultTranslate("Wrong Current Password");
    translatedText[34] = await resultTranslate("Watch Tutorial Again");
    translatedText[37] = await resultTranslate("Submit");
    translatedText[36] = await resultTranslate("Sign In");
    translatedText[35] = await resultTranslate("Sign Out");
    translatedText[38] = await resultTranslate("Set");
    translatedText[39] = await resultTranslate("Want Doctor Advice ?");
    translatedText[40] = await resultTranslate(
        "Search Child Specialist in your Area With their Contact Info");
    translatedText[41] = await resultTranslate("2 Contacts Added");

    saveStringValue2();
    // print(translatedText);
    change(null, status: RxStatus.success());
  }

  @override
  void onReady() {
    // retrieveStringValue2();
    // saveStringValue2();
    // print("\n");
    // print(trans2);
    // trans();
    retrieveStringValue2();
    super.onReady();
  }

//Translate
  resultTranslate(String userinput) async {
    // translator
    //     .translate(userinput,
    //         from: languageCode[availableLang.indexOf(dropdownFrom)],
    //         to: languageCode[availableLang.indexOf(dropdownTo)])
    //     .then(print);
    _prefs = await SharedPreferences.getInstance();
    // final List<String>? items = await _prefs.getStringList('items');
    // trans2 = await items as List<String>;
    // print(trans);

    var translation = await translator.translate(userinput,
        to: _prefs.getString('language') == null
            ? 'en'
            : _prefs.getString('language') as String);

    return translation.text as String;

    // prints exemplo
  }
}
