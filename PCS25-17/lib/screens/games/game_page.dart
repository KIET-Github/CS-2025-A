// ignore_for_file: prefer_const_constructors_in_immutables, prefer_const_constructors

import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sih_2022/screens/child/home.dart';
import 'package:sih_2022/screens/games/2048/game.dart';

import 'music_tiles/main_game.dart';

class GamePage extends StatefulWidget {
  GamePage({Key? key}) : super(key: key);

  @override
  State<GamePage> createState() => _GamePageState();
}

class _GamePageState extends State<GamePage> {
  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () {
        Get.offAllNamed(HomeScreen1.routeName);
        return Future.delayed(Duration(microseconds: 0));
      },
      child: Material(
          child: Container(
              decoration: BoxDecoration(
                  image: DecorationImage(
                      fit: BoxFit.cover,
                      image: AssetImage('assets/images/gamepage.png'),
                      opacity: 0.5)),
              height: MediaQuery.of(context).size.height,
              child: SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(20, 40, 20, 0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SizedBox(
                        height: 10,
                        width: MediaQuery.of(context).size.width,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          InkWell(
                            onTap: () {
                              AudioPlayer().play(AssetSource('tap.mp3'));
                              Navigator.of(context).push(MaterialPageRoute(
                                  builder: (context) => TitleGamePage()));
                            },
                            child: Column(
                              children: [
                                Container(
                                  padding: EdgeInsets.all(8), // Border width
                                  decoration: BoxDecoration(
                                      color: Colors.black,
                                      borderRadius: BorderRadius.circular(20)),
                                  child: ClipRRect(
                                    borderRadius: BorderRadius.circular(20),
                                    child: SizedBox.fromSize(
                                      size: Size.fromRadius(55), // Image radius
                                      child: Image.network(
                                          'https://firebasestorage.googleapis.com/v0/b/quizx-fb763.appspot.com/o/images%2Ftilegame.jpeg?alt=media&token=22929cb1-8060-4dcd-98de-343f90a99ca6',
                                          fit: BoxFit.cover),
                                    ),
                                  ),
                                ),
                                SizedBox(
                                  width: 90,
                                  child: Text(
                                    "Music Tile Game",
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                        color: Colors.grey[800],
                                        fontWeight: FontWeight.bold,
                                        fontSize: 20),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          InkWell(
                            onTap: () {
                              AudioPlayer().play(AssetSource('tap.mp3'));
                              Navigator.of(context).push(MaterialPageRoute(
                                  builder: (context) => Game()));
                            },
                            child: Column(
                              children: [
                                Container(
                                  padding: EdgeInsets.all(8), // Border width
                                  decoration: BoxDecoration(
                                      color: Colors.pink,
                                      borderRadius: BorderRadius.circular(20)),
                                  child: ClipRRect(
                                    borderRadius: BorderRadius.circular(20),
                                    child: SizedBox.fromSize(
                                      size: Size.fromRadius(55), // Image radius
                                      child: Image.network(
                                          'https://firebasestorage.googleapis.com/v0/b/quizx-fb763.appspot.com/o/images%2F1024.jpg?alt=media&token=9d5601d4-817c-462c-9da6-3a7c5757b2a9',
                                          fit: BoxFit.cover),
                                    ),
                                  ),
                                ),
                                SizedBox(
                                  width: 90,
                                  child: Text(
                                    "2048 Game",
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                        color: Colors.grey[800],
                                        fontWeight: FontWeight.bold,
                                        fontSize: 20),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      SizedBox(
                        height: 20,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          InkWell(
                            onTap: () {},
                            child: Column(
                              children: [
                                Container(
                                  padding: EdgeInsets.all(8), // Border width
                                  decoration: BoxDecoration(
                                      color: Colors.redAccent,
                                      borderRadius: BorderRadius.circular(20)),
                                  child: ClipRRect(
                                    borderRadius: BorderRadius.circular(20),
                                    child: SizedBox.fromSize(
                                      size: Size.fromRadius(55), // Image radius
                                      child: Image.network(
                                          'https://firebasestorage.googleapis.com/v0/b/quizx-fb763.appspot.com/o/images%2Fpacman.jpeg?alt=media&token=eb3b148d-3e74-4b67-bd83-6da4bad37d39',
                                          fit: BoxFit.cover),
                                    ),
                                  ),
                                ),
                                SizedBox(
                                  width: 90,
                                  child: Text(
                                    "Pacman Game",
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                        color: Colors.grey[800],
                                        fontWeight: FontWeight.bold,
                                        fontSize: 20),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          InkWell(
                            onTap: () {},
                            child: Column(
                              children: [
                                Container(
                                  padding: EdgeInsets.all(8), // Border width
                                  decoration: BoxDecoration(
                                      color: Colors.green,
                                      borderRadius: BorderRadius.circular(20)),
                                  child: ClipRRect(
                                    borderRadius: BorderRadius.circular(20),
                                    child: SizedBox.fromSize(
                                      size: Size.fromRadius(55), // Image radius
                                      child: Image.network(
                                          'https://firebasestorage.googleapis.com/v0/b/quizx-fb763.appspot.com/o/images%2Fwordle.png?alt=media&token=b4ccbc98-913a-4c24-8cb2-7598f626a667',
                                          fit: BoxFit.cover),
                                    ),
                                  ),
                                ),
                                SizedBox(
                                  width: 110,
                                  child: Text(
                                    "Wordle Game",
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                        color: Colors.grey[800],
                                        fontWeight: FontWeight.bold,
                                        fontSize: 20),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      SizedBox(
                        height: 20,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          InkWell(
                            onTap: () {},
                            child: Column(
                              children: [
                                Container(
                                  padding: EdgeInsets.all(8), // Border width
                                  decoration: BoxDecoration(
                                      color: Colors.orange,
                                      borderRadius: BorderRadius.circular(20)),
                                  child: ClipRRect(
                                    borderRadius: BorderRadius.circular(20),
                                    child: SizedBox.fromSize(
                                      size: Size.fromRadius(55), // Image radius
                                      child: Image.network(
                                          'https://firebasestorage.googleapis.com/v0/b/quizx-fb763.appspot.com/o/images%2Fnumber.jpeg?alt=media&token=973539fa-e9a9-4ad6-b518-e2af6456f461',
                                          fit: BoxFit.cover),
                                    ),
                                  ),
                                ),
                                SizedBox(
                                  width: 90,
                                  child: Text(
                                    "Number Ordering Game",
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                        color: Colors.grey[800],
                                        fontWeight: FontWeight.bold,
                                        fontSize: 20),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          InkWell(
                            onTap: () {},
                            child: Column(
                              children: [
                                Container(
                                  padding: EdgeInsets.all(8), // Border width
                                  decoration: BoxDecoration(
                                      color: Colors.purpleAccent,
                                      borderRadius: BorderRadius.circular(20)),
                                  child: ClipRRect(
                                    borderRadius: BorderRadius.circular(20),
                                    child: SizedBox.fromSize(
                                      size: Size.fromRadius(55), // Image radius
                                      child: Image.network(
                                          'https://firebasestorage.googleapis.com/v0/b/quizx-fb763.appspot.com/o/images%2Ftetris.jpg?alt=media&token=062b2ea3-f206-4117-915c-559100bc861b',
                                          fit: BoxFit.cover),
                                    ),
                                  ),
                                ),
                                SizedBox(
                                  width: 90,
                                  child: Text(
                                    "2048 Game",
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                        color: Colors.grey[800],
                                        fontWeight: FontWeight.bold,
                                        fontSize: 20),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      SizedBox(
                        height: 30,
                      ),
                      SizedBox(
                        height: 30,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          InkWell(
                            onTap: () {},
                            child: Column(
                              children: [
                                Container(
                                  padding: EdgeInsets.all(8), // Border width
                                  decoration: BoxDecoration(
                                      color: Colors.pink,
                                      borderRadius: BorderRadius.circular(20)),
                                  child: ClipRRect(
                                    borderRadius: BorderRadius.circular(20),
                                    child: SizedBox.fromSize(
                                      size: Size.fromRadius(55), // Image radius
                                      child: Image.network(
                                          'https://firebasestorage.googleapis.com/v0/b/quizx-fb763.appspot.com/o/images%2Ftilegame.jpeg?alt=media&token=22929cb1-8060-4dcd-98de-343f90a99ca6',
                                          fit: BoxFit.cover),
                                    ),
                                  ),
                                ),
                                SizedBox(
                                  width: 90,
                                  child: Text(
                                    "Music Tile Game",
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                        color: Colors.grey[800],
                                        fontWeight: FontWeight.bold,
                                        fontSize: 20),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          InkWell(
                            onTap: () {},
                            child: Column(
                              children: [
                                Container(
                                  padding: EdgeInsets.all(8), // Border width
                                  decoration: BoxDecoration(
                                      color: Colors.green,
                                      borderRadius: BorderRadius.circular(20)),
                                  child: ClipRRect(
                                    borderRadius: BorderRadius.circular(20),
                                    child: SizedBox.fromSize(
                                      size: Size.fromRadius(55), // Image radius
                                      child: Image.network(
                                          'https://firebasestorage.googleapis.com/v0/b/quizx-fb763.appspot.com/o/images%2F1024.jpg?alt=media&token=9d5601d4-817c-462c-9da6-3a7c5757b2a9',
                                          fit: BoxFit.cover),
                                    ),
                                  ),
                                ),
                                SizedBox(
                                  width: 90,
                                  child: Text(
                                    "2048 Game",
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                        color: Colors.grey[800],
                                        fontWeight: FontWeight.bold,
                                        fontSize: 20),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      SizedBox(
                        height: 30,
                      ),
                    ],
                  ),
                ),
              ))),
    );
  }
}
