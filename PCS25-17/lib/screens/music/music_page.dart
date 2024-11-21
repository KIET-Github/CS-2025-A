// ignore_for_file: prefer_const_constructors_in_immutables, prefer_const_constructors, use_build_context_synchronously

import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/material.dart';

class MusicPage extends StatefulWidget {
  MusicPage({Key? key}) : super(key: key);

  @override
  State<MusicPage> createState() => _MusicPageState();
}

class _MusicPageState extends State<MusicPage> {
  final audioPlayer = AudioPlayer();
  bool isPlaying = false;
  List<String> song = ['med1.mp3', 'med2.mp3', 'med3.mp3'];
  List<String> sonngname = [
    'Peaceful Garden',
    'Volley Of Hope',
    'Meditative Rain'
  ];
  String song2 = 'med1.mp3';
  int i = 0;
  Duration duration = Duration.zero;
  Duration position = Duration.zero;
  @override
  void initState() {
    super.initState();
    audioPlayer.onPlayerStateChanged.listen((event) {
      setState(() {
        isPlaying = event == PlayerState.playing;
      });
    });
    audioPlayer.onDurationChanged.listen((newDuraion) {
      setState(() {
        duration = newDuraion;
      });
    });
    audioPlayer.onPositionChanged.listen((event) {
      setState(() {
        position = event;
      });
    });
  }

  @override
  void dispose() {
    super.dispose();
    audioPlayer.dispose();
  }

  String formatTime(Duration duration) {
    String twoDigits(int n) => n.toString().padLeft(2, '0');
    final hours = twoDigits(duration.inHours);
    final minutes = twoDigits(duration.inMinutes.remainder(60));
    final seconds = twoDigits(duration.inSeconds.remainder(60));
    return [
      if (duration.inHours > 0) hours,
      minutes,
      seconds,
    ].join(':');
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        await audioPlayer.dispose();
        Navigator.pop(context);
        return Future.delayed(Duration(microseconds: 5));
      },
      child: Material(
        child: Padding(
          padding: const EdgeInsets.all(25.0),
          child: Center(
              child: Container(
            height: 500,
            decoration: BoxDecoration(
                border: Border.all(color: Colors.black),
                borderRadius: BorderRadius.circular(28),
                color: Colors.grey[200]),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Image(
                  image: AssetImage('assets/images/music_player_image.png'),
                  height: 250,
                  width: 250,
                ),
                SizedBox(
                  height: 15,
                ),
                Text(
                  sonngname[i],
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(60, 0, 60, 0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      InkWell(
                          onTap: () async {
                            audioPlayer.pause();
                            if (i == 0) {
                              setState(() {
                                audioPlayer.seek(Duration.zero);
                                song2 = song[0];
                                audioPlayer.play(AssetSource(song2));
                              });
                            } else {
                              if (position >= Duration(seconds: 5)) {
                                audioPlayer.seek(Duration.zero);
                                song2 = song[i];
                                audioPlayer.play(AssetSource(song2));
                              } else {
                                setState(() {
                                  position = Duration.zero;
                                  i = i - 1;
                                  song2 = song[i];
                                  audioPlayer.play(AssetSource(song2));
                                });
                              }
                            }
                          },
                          child: CircleAvatar(
                              backgroundColor: Color.fromRGBO(255, 100, 100, 1),
                              foregroundColor: Colors.grey[200],
                              maxRadius: 20,
                              child: Icon(
                                Icons.skip_previous,
                                size: 35,
                              ))),
                      InkWell(
                          onTap: () async {
                            if (isPlaying) {
                              await audioPlayer.pause();
                            } else {
                              await audioPlayer.play(AssetSource(song2));
                            }
                          },
                          child: CircleAvatar(
                              backgroundColor: Color.fromRGBO(255, 100, 100, 1),
                              foregroundColor: Colors.grey[200],
                              maxRadius: 35,
                              child: isPlaying
                                  ? Icon(
                                      Icons.pause,
                                      size: 35,
                                    )
                                  : Icon(
                                      Icons.play_arrow,
                                      size: 35,
                                    ))),
                      InkWell(
                          onTap: () async {
                            audioPlayer.pause();
                            if (i == song.length - 1) {
                              setState(() {
                                position = Duration.zero;
                                song2 = song[0];
                                audioPlayer.play(AssetSource(song2));
                              });
                            } else {
                              setState(() {
                                position = Duration.zero;
                                i = i + 1;
                                song2 = song[i];
                                audioPlayer.play(AssetSource(song2));
                              });
                            }
                          },
                          child: CircleAvatar(
                              backgroundColor: Color.fromRGBO(255, 100, 100, 1),
                              foregroundColor: Colors.grey[200],
                              maxRadius: 20,
                              child: Icon(
                                Icons.skip_next,
                                size: 35,
                              ))),
                    ],
                  ),
                ),
                Slider(
                    thumbColor: Color.fromRGBO(255, 100, 100, 1),
                    inactiveColor: Colors.grey[500],
                    activeColor: Color.fromRGBO(255, 100, 100, 1),
                    min: 0,
                    max: duration.inSeconds.toDouble(),
                    value: position.inSeconds.toDouble(),
                    onChanged: (value) async {
                      final position = Duration(seconds: value.toInt());
                      await audioPlayer.seek(position);
                      await audioPlayer.resume();
                    }),
                Padding(
                  padding: EdgeInsets.all(4),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Padding(
                        padding: const EdgeInsets.fromLTRB(15, 0, 0, 0),
                        child: Text(formatTime(position)),
                      ),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(0, 0, 15, 0),
                        child: Text(formatTime(duration)),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          )),
        ),
      ),
    );
  }
}
