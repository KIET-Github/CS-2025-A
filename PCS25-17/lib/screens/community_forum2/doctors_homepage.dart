import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sih_2022/screens/community_forum2/doctors_class.dart';
import 'package:sih_2022/screens/screens.dart';

import 'doctors_page.dart';

class DoctorHomePage extends StatefulWidget {
  const DoctorHomePage({Key? key}) : super(key: key);

  @override
  State<DoctorHomePage> createState() => _DoctorHomePageState();
}

class _DoctorHomePageState extends State<DoctorHomePage> {
  @override
  // void initState() {
  //   super.initState();
  //   loadData();
  // }

  // loadData() async {
  //   final specJson = await rootBundle.loadString("assets/files/specable.json");
  //   final decodeData = jsonDecode(specJson);
  //   var products = decodeData["products"];

  //   SpeciallyAbled.items =
  //       List.from(products).map<Item>((item) => Item.fromMap(item)).toList();
  //   setState(() {});
  // }

  // ignore: non_constant_identifier_names, override_on_non_overriding_member
  List<Products> display_list = List.from(Doctors.items);
  void searchBook(String query) {
    List<Products> suggestions = Doctors.items.where((Doctors) {
      final address2 = Doctors.address.toLowerCase();
      print(query);
      // final input = query.toLowerCase();
      return address2.contains(query.toLowerCase());
    }).toList();
    print("$suggestions\n");
    if (query == null) {
      setState(() {
        display_list = List.from(Doctors.items);
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
      child: SafeArea(
        child: Scaffold(
          drawerScrimColor: Colors.blue,
          appBar: AppBar(
            backgroundColor: Colors.white,
            elevation: 0.00,
            iconTheme: const IconThemeData(color: Colors.black),
            title: Center(
              child: Padding(
                padding: EdgeInsets.all(10.0),
                child: Text(
                  "Child Specialists near you",
                  style: TextStyle(
                    decorationColor: Colors.grey,
                    fontSize: 25,
                    fontWeight: FontWeight.bold,
                    fontStyle: FontStyle.italic,
                    fontFamily: 'Open Sans',
                    color: Colors.black,
                  ),
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
                autocorrect: true, cursorColor: Colors.red,
                enableSuggestions: true,
                onChanged: searchBook,
                // onChanged: (value) => updateList(value) ,
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
                    "Add a Doctor",
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
                    return Itemwid(
                      item: display_list[index],
                    );
                  }),
            )
          ]),
          drawer: const Drawer(),
        ),
      ),
    );
  }
}
