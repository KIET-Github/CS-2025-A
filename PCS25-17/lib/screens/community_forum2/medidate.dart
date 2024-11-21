import 'package:flutter/material.dart';

class Meditate extends StatelessWidget {
  const Meditate({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: SingleChildScrollView(
        child: Material(
          child: Padding(
            padding: const EdgeInsets.all(18.0),
            child: Container(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(
                    height: 40,
                  ),
                  Text(
                    "Learn how to meditate 🧘",
                    style: TextStyle(fontSize: 30),
                  ),
                  SizedBox(
                    height: 35,
                  ),
                  Image.asset('assets/images/meditation.jpeg',
                      fit: BoxFit.cover),
                  SizedBox(
                    height: 20,
                  ),
                  Container(
                    margin: EdgeInsets.all(14),
                    height: MediaQuery.of(context).size.height,
                    child: Text(
                        "Meditation is simpler (and harder) than most people think. Read these steps, make sure you’re somewhere where you can relax into this process, set a timer, and give it a shot:1) Take a seatFind place to sit that feels calm and quiet to you."),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
