// ignore_for_file: unused_element, deprecated_member_use

import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';
import 'package:sih_2022/controllers/auth_controller.dart';
import 'package:url_launcher/url_launcher.dart';

class MyDrawerController extends GetxController {
  Rxn<User?> user = Rxn();

  void signOut() {
    Get.find<AuthController>().signOut();
  }

  void signIn() {
    Get.find<AuthController>().navigateToLogin();
  }

  @override
  void onReady() {
    user.value = Get.find<AuthController>().getUser();
    super.onReady();
  }

  Future<void> _launch(String url) async {
    if (!await launch(
      url,
    )) {
      throw 'Could not launch $url';
    }
  }
}
