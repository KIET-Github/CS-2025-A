import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sih_2022/screens/child/home.dart';

class Gratitude extends StatelessWidget {
  const Gratitude({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () {
        Get.offAllNamed(HomeScreen1.routeName);
        return Future.delayed(Duration(seconds: 1));
      },
      child: SafeArea(
        child: Material(
          child: SingleChildScrollView(
            child: Container(
              decoration: const BoxDecoration(
                image: DecorationImage(
                    image: NetworkImage(
                        'https://firebasestorage.googleapis.com/v0/b/quizx-fb763.appspot.com/o/images%2F3639828%202.png?alt=media&token=4196379e-b55e-4ac1-a570-d231a540a6f1'),
                    fit: BoxFit.cover),
              ),
              child: Padding(
                padding: const EdgeInsets.all(15.0),
                child: Column(
                  children: [
                    const SizedBox(
                      height: 30,
                    ),
                    TextFormField(
                      decoration: const InputDecoration(
                        labelText: "Did You feel Loved Today?",
                        labelStyle:
                            TextStyle(fontSize: 25, color: Colors.black),
                        contentPadding: EdgeInsets.fromLTRB(12, 20, 12, 20),
                      ),
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    TextFormField(
                      decoration: const InputDecoration(
                        labelText: "What do you feel thankful for?",
                        labelStyle:
                            TextStyle(fontSize: 25, color: Colors.black),
                        contentPadding: EdgeInsets.fromLTRB(12, 20, 12, 20),
                      ),
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    TextFormField(
                      decoration: const InputDecoration(
                        labelText: "Who is your Best Friend?",
                        labelStyle:
                            TextStyle(fontSize: 25, color: Colors.black),
                        contentPadding: EdgeInsets.fromLTRB(12, 20, 12, 20),
                      ),
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    TextFormField(
                      decoration: const InputDecoration(
                        labelText: "Did you felt Guilty Today?",
                        labelStyle:
                            TextStyle(fontSize: 25, color: Colors.black),
                        contentPadding: EdgeInsets.fromLTRB(12, 20, 12, 20),
                      ),
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    TextFormField(
                      decoration: const InputDecoration(
                        labelText: "Your Favourite Subject?",
                        labelStyle:
                            TextStyle(fontSize: 25, color: Colors.black),
                        contentPadding: EdgeInsets.fromLTRB(12, 20, 12, 20),
                      ),
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    TextFormField(
                      decoration: const InputDecoration(
                        labelText: "Your Favourite Teacher?",
                        labelStyle:
                            TextStyle(fontSize: 25, color: Colors.black),
                        contentPadding: EdgeInsets.fromLTRB(12, 20, 12, 20),
                      ),
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    TextFormField(
                      decoration: const InputDecoration(
                        labelText: "What did you love Today?",
                        labelStyle:
                            TextStyle(fontSize: 25, color: Colors.black),
                        contentPadding: EdgeInsets.fromLTRB(12, 20, 12, 20),
                      ),
                    ),
                    const SizedBox(
                      height: 30,
                    ),
                    ElevatedButton(
                        onPressed: () {
                          Get.offAllNamed(HomeScreen1.routeName);
                        },
                        child: Text(
                          "Submit",
                          style: TextStyle(fontSize: 20),
                        ))
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
