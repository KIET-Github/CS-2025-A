// ignore_for_file: unused_catch_clause, prefer_const_constructors

import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:sih_2022/firebase/references.dart';
import 'package:sih_2022/screens/child/home.dart';
import 'package:sih_2022/screens/screens.dart' show HomeScreen, LoginScreen;
import 'package:sih_2022/utils/utils.dart';
import 'package:sih_2022/widgets/widgets.dart';

class AuthController extends GetxController {
  late SharedPreferences _prefs;
  bool islog = false;

  @override
  void onReady() {
    retrieveStringValue();

    super.onReady();
  }

  retrieveStringValue() async {
    _prefs = await SharedPreferences.getInstance();
    bool? value = _prefs.getBool("childlof");
    if (value == null) {
      islog = false;
    } else {
      islog = value;
    }
    initAuth();
    Future.delayed(Duration(seconds: 1));
  }

  late FirebaseAuth _auth;
  final _user = Rxn<User>();
  late Stream<User?> _authStateChanges;

  void initAuth() async {
    Future.delayed(const Duration(seconds: 2));
    _auth = FirebaseAuth.instance;
    _authStateChanges = _auth.authStateChanges();
    _authStateChanges.listen((User? user) {
      _user.value = user;
    });
    navigateToIntroduction();
  }

  Future<void> siginInWithGoogle() async {
    final GoogleSignIn googleSignIn = GoogleSignIn();

    try {
      GoogleSignInAccount? account = await googleSignIn.signIn();
      if (account != null) {
        final gAuthentication = await account.authentication;
        final credential = GoogleAuthProvider.credential(
            idToken: gAuthentication.idToken,
            accessToken: gAuthentication.accessToken);
        await _auth.signInWithCredential(credential);
        await saveUser(account);
        navigateToHome();
      } else {
        navigateToLogin();
      }
    } on Exception catch (error) {
      // AppLogger.e(error);
    }
  }

  Future<void> signOut() async {
    AppLogger.d("Sign out");
    try {
      await _auth.signOut();
      navigateToHome();
    } on FirebaseAuthException catch (e) {
      AppLogger.e(e);
    }
  }

  Future<void> saveUser(GoogleSignInAccount account) async {
    userFR.doc(account.email).set({
      "email": account.email,
      "name": account.displayName,
      "profilepic": account.photoUrl
    });
  }

  User? getUser() {
    _user.value = _auth.currentUser;
    return _user.value;
  }

  bool isLogedIn() {
    return _auth.currentUser != null;
  }

  void navigateToHome() {
    Get.offAllNamed(HomeScreen.routeName);
  }

  void navigateToLogin() {
    Get.offAllNamed(LoginScreen.routeName);
  }

  void navigateToIntroduction() {
    print(islog);
    islog
        ? Get.offAllNamed(HomeScreen1.routeName)
        : Get.offAllNamed(HomeScreen.routeName);
  }

  void showLoginAlertDialog() {
    Get.dialog(
      Dialogs.quizStartDialog(onTap: () {
        Get.back();
        navigateToLogin();
      }),
      barrierDismissible: false,
    );
  }
}
