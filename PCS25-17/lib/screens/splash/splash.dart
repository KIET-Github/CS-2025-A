// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({Key? key}) : super(key: key);

  static const String routeName = '/';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Image(
        image: AssetImage("assets/images/Loader1.jpeg"),
        fit: BoxFit.cover,
      ),
    );
  }
}
