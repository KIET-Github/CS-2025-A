// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:iconsax/iconsax.dart';
// import 'package:translator/translator.dart';
import 'package:text_to_speech/text_to_speech.dart';

String story =
    "Once upona time, 210 million years ago, the sun was shining as Sammy the Stegosaurus watched the pterodactyls flap their wings and fly above the treetops. 'Wow!' she thought, 'I have never seen a dinosaur that flies before!' She could not believe that pterodactyl's wingspan can be as large as 30 feet. It looked like fun, but it made Sammy feel frustrated and sad.\n\n\nShe was a stegosaurus and could not fly. She did not have any friends to play with.Tippy the Pterodactyl saw Sammy crying and flew down to the forest to talk to her. Tippy landed and was walking on all fours, unlike other birds Sammy had seen. Sammy was excited that a new friend was coming to her. She thought she might finally have a friend to play with.'Hi! I'm Sammy.\n\n\nDo you want to play a game with me over here?' Sammy asked.Tippy replied,'I don't want to play down here. I want to soar in the sky. Why can't you just fly up here and play with us?''I can't. I can't fly. I am a stegosaurus. ' Sammy replied.'You don't know how to fly?! That is so weird! And what are those pointy things on your back? I only play games up in the sky with my pterodactyl friends.'\n\n\nBefore Sammy could tell her about all 17 bony plates that pointed out like spikes and ran down her back in two rows, Tippy had already started to fly away.Sammy could hear her laughing in the distance.";

class StoryPage extends StatefulWidget {
  const StoryPage({Key? key}) : super(key: key);
  static const routeName = '/story';

  @override
  State<StoryPage> createState() => _StoryPageState();
}

class _StoryPageState extends State<StoryPage> {
  TextToSpeech tts = TextToSpeech();
  final String defaultLanguage = 'hi-IN';
  @override
  void initState() {
    initLanguages();
    // tts.setLanguage(defaultLanguage);
    // tts.speak(story);

    super.initState();
  }

  String? language;
  String? languageCode;
  List<String> languages = <String>[];
  List<String> languageCodes = <String>[];
  String? voice;
  bool isPlaying = false;

  Future<void> initLanguages() async {
    /// populate lang code (i.e. en-US)
    // languageCodes = await tts.getLanguages();
    // print(languageCodes);

    // /// populate displayed language (i.e. English)
    // final List<String>? displayLanguages = await tts.getDisplayLanguages();
    // if (displayLanguages == null) {
    //   return;
    // }

    // languages.clear();
    // for (final dynamic lang in displayLanguages) {
    //   languages.add(lang as String);
    // }

    // final String? defaultLangCode = await tts.getDefaultLanguage();
    // if (defaultLangCode != null && languageCodes.contains(defaultLangCode)) {
    //   languageCode = defaultLangCode;
    // } else {
    //   languageCode = defaultLanguage;
    // }
    // language = await tts.getDisplayLanguageByCode(languageCode!);

    // / get voice
    // voice = await getVoiceByLang(languageCode!);
    // List<String>? voices = await tts.getVoiceByLang(defaultLanguage);
    // print(voice);
    // print(voices);
    // tts.setPitch(20);
    await tts.setLanguage(defaultLanguage);

    // if (mounted) {
    //   setState(() {
    //     tts.speak(story);
    //   });
  }

  // Future<String?> getVoiceByLang(String lang) async {
  //   final List<String>? voices = await tts.getVoiceByLang(languageCode!);
  //   if (voices != null && voices.isNotEmpty) {
  //     return voices.last;
  //   }
  //   return null;
  // }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () {
        tts.stop();
        Get.back();
        return Future.delayed(Duration(seconds: 1));
      },
      child: Material(
        color: Colors.lime[100],
        child: SingleChildScrollView(
          child: Column(
            children: [
              SizedBox(
                height: 60,
              ),
              Hero(
                tag: 'hero',
                // ignore: await_only_futures
                child: Text(
                  "Story of a Baby Dinasaur",
                  style: TextStyle(
                    color: Colors.green[600],
                    fontSize: 30,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              SizedBox(
                height: 30,
              ),
              Image(image: AssetImage('assets/images/dino3.png')),
              SizedBox(
                height: 20,
              ),
              ElevatedButton(
                  onPressed: () {
                    setState(() {
                      if (isPlaying) {
                        tts.stop();
                        isPlaying = false;
                      } else {
                        tts.speak(story);
                        isPlaying = true;
                      }
                    });
                  },
                  child: Icon(Icons.volume_up)),
              Padding(
                padding: EdgeInsets.all(18.0),
                child: Center(
                  child: Text(
                    story,
                    textAlign: TextAlign.justify,
                    style: TextStyle(
                      color: Colors.black54,
                      height: 1.34,
                      fontWeight: FontWeight.normal,
                      fontSize: 20,
                    ),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
