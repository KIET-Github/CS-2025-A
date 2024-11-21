import 'package:flutter/material.dart';
// ignore: unused_import
import 'package:flutter/services.dart';
import 'package:sih_2022/screens/community_forum2/item_widget.dart';
// ignore: unused_import
import 'dart:convert';

import 'package:sih_2022/screens/community_forum2/specially_class.dart';
// import 'package:flutter_speciallyabled/pages/specially_class.dart';
// import 'package:flutter_speciallyabled/pages/item_widget.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  List<Item> display_list = List.from(SpeciallyAbled.items);

  void searchBook(String query) {
    List<Item> suggestions = SpeciallyAbled.items.where((SpeciallyAbled) {
      final address2 = SpeciallyAbled.address.toLowerCase();
      print(query);
      // final input = query.toLowerCase();
      return address2.contains(query.toLowerCase());
    }).toList();
    print("$suggestions\n");
    if (query == null) {
      setState(() {
        display_list = List.from(SpeciallyAbled.items);
      });
    } else {
      display_list = List.empty();
      setState(() => display_list = suggestions);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawerScrimColor: Colors.blue,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.00,
        iconTheme: const IconThemeData(color: Colors.black),
        title: const Center(
          child: Text(
            "Schools near you",
            style: TextStyle(
              decorationColor: Colors.grey,
              fontSize: 30,
              fontWeight: FontWeight.bold,
              fontStyle: FontStyle.italic,
              fontFamily: 'Open Sans',
              color: Colors.black,
            ),
          ),
        ),
      ),
      body: Column(children: [
        // const Text("Search your city here",
        // style: TextStyle(
        //   color: Colors.black,
        //   fontSize: 12,
        //   fontWeight:FontWeight.bold,
        // ),),

        const SizedBox(
          height: 20,
        ),

        Padding(
          padding: const EdgeInsets.all(20.0),
          child: TextField(
            autocorrect: true,
            cursorColor: Colors.red,
            enableSuggestions: true,
            decoration: const InputDecoration(
              filled: true,
              fillColor: Colors.white,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.all(Radius.circular(100.0)),
                borderSide: BorderSide(
                  color: Colors.red,
                  width: 20,
                ),
              ),
              hoverColor: Colors.blueGrey,
              hintText: "Search your city here..... eg.Delhi",
              suffixIcon: Icon(Icons.search_rounded),
            ),
            onChanged: searchBook,
          ),
        ),
        const SizedBox(
          height: 5,
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: const [
              Icon(Icons.add_location_alt_rounded,
                  size: 40, color: Color.fromARGB(255, 45, 155, 206)),
              Text(
                "Add a School",
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 15,
                ),
              ),
            ],
          ),
        ),

        Expanded(
          child: ListView.builder(
              itemCount: display_list.length,
              itemBuilder: (context, index) {
                // ignore: unused_local_variable
                final book = display_list[index];
                return ItemWidget(
                  item: display_list[index],
                );
              }),
        )
      ]),
      drawer: const Drawer(),
    );

    // ignore: dead_code
  }
}
