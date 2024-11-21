import 'package:flutter/material.dart';

import 'community_forum.dart';

class postquestion extends StatefulWidget {
  postquestion({Key? key}) : super(key: key);

  @override
  State<postquestion> createState() => _postquestionState();
}

class _postquestionState extends State<postquestion> {
  @override
  Widget build(BuildContext context) {
    int maxLines = 15;
    return SafeArea(
      child: Material(
        child: Padding(
          padding: const EdgeInsets.all(30.0),
          child: SingleChildScrollView(
            child: Column(
              children: [
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "Post a Question",
                    style: TextStyle(
                      fontSize: 30,
                    ),
                  ),
                ),
                SizedBox(
                  height: 30,
                ),
                Container(
                  margin: EdgeInsets.all(12),
                  height: maxLines * 24.0,
                  child: Stack(
                    children: [
                      TextField(
                        maxLines: maxLines,
                        decoration: InputDecoration(
                          border: OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(20)),
                              borderSide: new BorderSide(color: Colors.white)),
                          focusedBorder: OutlineInputBorder(
                            borderRadius:
                                BorderRadius.all(Radius.circular(20.0)),
                            borderSide:
                                BorderSide(width: 1, color: Colors.redAccent),
                          ),
                          hintText: "Type something...",
                          fillColor: Colors.white,
                          filled: true,
                        ),
                      ),
                      Positioned(
                          top: 260,
                          left: 100,
                          child: Row(
                            children: [
                              IconButton(
                                  onPressed: () {},
                                  icon: Icon(Icons.add_a_photo),
                                  color: Colors.redAccent),
                              IconButton(
                                onPressed: () {},
                                icon: Icon(Icons.add_box_outlined),
                                color: Colors.redAccent,
                              ),
                              IconButton(
                                onPressed: () {},
                                icon: Icon(Icons.add_alert_rounded),
                                color: Colors.redAccent,
                              ),
                              IconButton(
                                onPressed: () {},
                                icon: Icon(Icons.add_card),
                                color: Colors.redAccent,
                              )
                            ],
                          ))
                    ],
                  ),
                ),
                Container(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    "Tags",
                    style: TextStyle(
                      fontSize: 20,
                    ),
                  ),
                ),
                SizedBox(
                  height: 20,
                ),
                Container(
                  width: MediaQuery.of(context).size.width * 0.75,
                  child: const TextField(
                    autocorrect: true, cursorColor: Colors.red,
                    enableSuggestions: true,

                    // onChanged: (value) => updateList(value) ,
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: Colors.white,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(100.0)),
                        borderSide: BorderSide(
                          color: Colors.red,
                          width: 10,
                        ),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(100.0)),
                        borderSide:
                            BorderSide(width: 1, color: Colors.redAccent),
                      ),
                      // hoverColor: Colors.blueGrey,
                      hintText: "Search here",
                      suffixIcon: Icon(Icons.search_rounded),
                    ),
                    // onChanged:updateList,
                  ),
                ),
                SizedBox(
                  height: 20,
                ),
                Row(
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: Container(
                        decoration: BoxDecoration(
                            border: Border.all(color: Colors.orange),
                            color: Color.fromARGB(255, 255, 255, 255),
                            borderRadius:
                                BorderRadius.all(Radius.circular(20))),
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text("kids"),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: Container(
                        decoration: BoxDecoration(
                            border: Border.all(color: Colors.orange),
                            color: Color.fromARGB(255, 255, 255, 255),
                            borderRadius:
                                BorderRadius.all(const Radius.circular(20))),
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text("Health"),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: Container(
                        decoration: BoxDecoration(
                            border: Border.all(color: Colors.orange),
                            color: Color.fromARGB(255, 255, 255, 255),
                            borderRadius:
                                BorderRadius.all(Radius.circular(20))),
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text("mental"),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: Container(
                        decoration: BoxDecoration(
                            border: Border.all(color: Colors.orange),
                            color: Color.fromARGB(255, 255, 255, 255),
                            borderRadius:
                                BorderRadius.all(Radius.circular(20))),
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text("affective"),
                        ),
                      ),
                    ),
                  ],
                ),
                SizedBox(
                  height: 60,
                ),
                ConstrainedBox(
                  constraints: BoxConstraints.tightFor(
                      width: MediaQuery.of(context).size.width, height: 50),
                  child: ElevatedButton(
                    onPressed: () => Navigator.of(context).push(
                        MaterialPageRoute(
                            builder: (context) => Community_Forum())),
                    child: Text(
                      "Submit",
                      style: TextStyle(fontSize: 20),
                    ),
                    style: ElevatedButton.styleFrom(primary: Colors.redAccent),
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
