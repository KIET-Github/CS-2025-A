import 'package:flutter/material.dart';
// ignore: unused_import
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:sih_2022/screens/home/home_screen.dart';
// ignore: unused_import
import 'dart:convert';

import 'package:sih_2022/screens/specially%20abled/specially_class.dart';

import 'item_widget.dart';

class SpeciallyAbledPage extends StatefulWidget {
  const SpeciallyAbledPage({Key? key}) : super(key: key);

  @override
  State<SpeciallyAbledPage> createState() => _SpeciallyAbledPageState();
}

class _SpeciallyAbledPageState extends State<SpeciallyAbledPage> {
  @override

  // ignore: non_constant_identifier_names, override_on_non_overriding_member
  List<Item> display_list = List.from(SpeciallyAbled.items);

  // void updateList(final String value) {
  //   setState(() {
  //     display_list = SpeciallyAbled.items
  //         .where((element) =>
  //             element.schoolname.toLowerCase().contains(value.toLowerCase()))
  //         .toList();
  //   });
  // }

  void searchBook(String query) {
    List<Item> suggestions = SpeciallyAbled.items.where((SpeciallyAbled) {
      final address2 = SpeciallyAbled.address.toLowerCase();
      print(query);
      // print(address2.contains(query.toLowerCase()));
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
    return WillPopScope(
      onWillPop: () {
        Get.offAllNamed(HomeScreen.routeName);
        return Future.delayed(Duration(seconds: 1));
      },
      child: Scaffold(
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
            padding: EdgeInsets.all(20.0),
            child: TextField(
              autocorrect: true,
              enableSuggestions: true,

              // onChanged: (value) => updateList(value) ,
              decoration: InputDecoration(
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
              // onChanged:updateList,
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
                  // final book = display_list;
                  return ItemWidget(
                    item: display_list[index],
                  );
                }),
          )
        ]),
      ),
    );
    // void searchBook(String query) {
    //   final suggestions = display_list.where((book) {
    //     final address = book.address.toLowerCase();
    //     final input = query.toLowerCase();
    //     return address.contains(input);
    //   }).toList();

    //   setState(() => display_list = suggestions);}

    // ignore: dead_code
  }
}
