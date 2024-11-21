import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sih_2022/screens/community_forum2/article_section.dart';
import 'package:sih_2022/screens/community_forum2/communitynext.dart';
import 'package:sih_2022/screens/community_forum2/list1.dart';
import 'package:sih_2022/screens/community_forum2/postquestion.dart';

import '../../controllers/auth_controller.dart';
import '../../controllers/timeline/timeline_controller.dart';
import '../home/home_screen.dart';

class Community_Forum extends StatefulWidget {
  const Community_Forum({Key? key}) : super(key: key);

  @override
  State<Community_Forum> createState() => _Community_ForumState();
}

class _Community_ForumState extends State<Community_Forum>
    with TickerProviderStateMixin {
  List<Community> list = List.from(forms.products);
  ScrollController scrollController = ScrollController(
    initialScrollOffset: 10, // or whatever offset you wish
    keepScrollOffset: true,
  );

  @override
  Widget build(BuildContext context) {
    TabController tabcontoller = TabController(length: 5, vsync: this);
    return WillPopScope(
      onWillPop: () {
        Get.offAllNamed(HomeScreen.routeName);
        return Future.delayed(Duration());
      },
      child: Scaffold(
        body: Padding(
          padding: const EdgeInsets.fromLTRB(20, 20, 20, 0),
          child: SafeArea(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: EdgeInsets.all(5.0),
                  child: Row(
                    children: [
                      Container(
                        width: MediaQuery.of(context).size.width * 0.75,
                        child: const TextField(
                          autocorrect: true, cursorColor: Colors.red,
                          enableSuggestions: true,

                          decoration: InputDecoration(
                            filled: true,
                            fillColor: Colors.white,
                            border: OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(100.0)),
                              borderSide: BorderSide(
                                color: Colors.red,
                                width: 10,
                              ),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(100.0)),
                              borderSide: BorderSide(
                                  width: 1.5, color: Colors.redAccent),
                            ),

                            // hoverColor: Colors.blueGrey,
                            hintText: "Search here",
                            suffixIcon: Icon(
                              Icons.search_rounded,
                              color: Colors.redAccent,
                            ),
                          ),
                          // onChanged:updateList,
                        ),
                      ),
                      SizedBox(
                        width: 0,
                      ),
                      IconButton(
                        onPressed: () => Navigator.of(context).push(
                            MaterialPageRoute(
                                builder: ((context) => ArticleSection()))),
                        icon: Icon(Icons.article_rounded),
                      )
                    ],
                  ),
                ),
                const SizedBox(
                  height: 15,
                ),
                Row(
                  children: [
                    Text(
                      "Community Forum",
                      style: TextStyle(
                        color: Colors.black,
                        fontWeight: FontWeight.bold,
                        fontSize: 24,
                      ),
                    ),
                    Spacer(),
                    // onTap: (() => Navigator.of(context).push(MaterialPageRoute(builder: ((context) => Communitynext(indexes: index))))),
                    IconButton(
                      onPressed: (() => Navigator.of(context).push(
                          MaterialPageRoute(
                              builder: ((context) => postquestion())))),
                      icon: Icon(Icons.add, size: 50),
                    )
                  ],
                ),
                const SizedBox(
                  height: 15,
                ),
                Container(
                  child: TabBar(
                      unselectedLabelColor: Colors.redAccent,
                      indicatorSize: TabBarIndicatorSize.label,
                      controller: tabcontoller,
                      indicator: const BoxDecoration(
                        borderRadius: BorderRadius.all(Radius.circular(25)),
                        color: Colors.redAccent,
                      ),
                      isScrollable: true,
                      // labelPadding: const EdgeInsets.all(10),
                      labelPadding: const EdgeInsets.symmetric(horizontal: 5),
                      automaticIndicatorColorAdjustment: true,
                      tabs: [
                        Tab(
                          child: Container(
                            decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(25),
                                border: Border.all(
                                    color: Colors.redAccent, width: 1)),
                            child: const Padding(
                              padding: EdgeInsets.all(10.0),
                              child: Align(
                                alignment: Alignment.center,
                                child: Text("Cognitive"),
                              ),
                            ),
                          ),
                        ),
                        Tab(
                          child: Container(
                            decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(25),
                                border: Border.all(
                                    color: Colors.redAccent, width: 1)),
                            child: const Padding(
                              padding: EdgeInsets.all(10.0),
                              child: Align(
                                alignment: Alignment.center,
                                child: Text("Psycomotive"),
                              ),
                            ),
                          ),
                        ),
                        Tab(
                          child: Container(
                            decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(25),
                                border: Border.all(
                                    color: Colors.redAccent, width: 1)),
                            child: const Padding(
                              padding: EdgeInsets.all(10.0),
                              child: Align(
                                alignment: Alignment.center,
                                child: Text("Affective"),
                              ),
                            ),
                          ),
                        ),
                        Tab(
                          child: Container(
                            decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(25),
                                border: Border.all(
                                    color: Colors.redAccent, width: 1)),
                            child: const Padding(
                              padding: EdgeInsets.all(10.0),
                              child: Align(
                                alignment: Alignment.center,
                                child: Text("Mental Health"),
                              ),
                            ),
                          ),
                        ),
                        Tab(
                          child: Container(
                            decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(25),
                                border: Border.all(
                                    color: Colors.redAccent, width: 1)),
                            child: const Padding(
                              padding: EdgeInsets.all(10.0),
                              child: Align(
                                alignment: Alignment.center,
                                child: Text("Specially Abled"),
                              ),
                            ),
                          ),
                        ),
                      ]),
                ),
                const SizedBox(
                  height: 20,
                ),
                Expanded(
                  child: TabBarView(
                    controller: tabcontoller,
                    children: [
                      ListView.builder(
                          physics: const BouncingScrollPhysics(),
                          itemCount: 4,
                          itemBuilder: ((context, index) {
                            return Padding(
                              padding: const EdgeInsets.all(5.0),
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  //1st
                                  InkWell(
                                    onTap: (() => Navigator.of(context).push(
                                        MaterialPageRoute(
                                            builder: ((context) =>
                                                Communitynext(
                                                    indexes: index))))),
                                    child: Material(
                                      color: Colors.white,
                                      elevation: 5,
                                      borderRadius: const BorderRadius.all(
                                          Radius.circular(15)),
                                      child: Container(
                                        margin: const EdgeInsets.fromLTRB(
                                            10, 20, 20, 20),
                                        width: double.maxFinite,
                                        child: Row(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            Image(
                                                image: NetworkImage(
                                                  forms.products[index].images,
                                                ),
                                                fit: BoxFit.contain),
                                            const SizedBox(
                                              height: 10,
                                            ),
                                            Padding(
                                              padding:
                                                  const EdgeInsets.all(2.0),
                                              child: Column(
                                                children: [
                                                  Container(
                                                    width: 200,
                                                    child: Text(
                                                      forms
                                                          .products[index].ques,
                                                      style: const TextStyle(
                                                        color: Colors.black,
                                                        height: 1.5,
                                                        fontSize: 15,
                                                        fontWeight:
                                                            FontWeight.bold,
                                                      ),
                                                    ),
                                                  ),
                                                  SizedBox(
                                                    height: 10,
                                                  ),
                                                  Row(
                                                    mainAxisAlignment:
                                                        MainAxisAlignment.start,
                                                    children: [
                                                      Container(
                                                        decoration:
                                                            BoxDecoration(
                                                          color: Color.fromRGBO(
                                                              245, 245, 245, 1),
                                                          borderRadius:
                                                              BorderRadius
                                                                  .circular(25),
                                                        ),
                                                        child: Padding(
                                                          padding:
                                                              EdgeInsets.all(
                                                                  10.0),
                                                          child: Align(
                                                            alignment: Alignment
                                                                .topLeft,
                                                            child: Text(
                                                              forms
                                                                  .products[
                                                                      index]
                                                                  .q1,
                                                              style: TextStyle(
                                                                fontSize: 10,
                                                                color: Color
                                                                    .fromRGBO(
                                                                        133,
                                                                        142,
                                                                        173,
                                                                        1),
                                                              ),
                                                            ),
                                                          ),
                                                        ),
                                                      ),
                                                      const SizedBox(
                                                        width: 20,
                                                      ),
                                                      Container(
                                                        decoration:
                                                            BoxDecoration(
                                                          color: const Color
                                                                  .fromRGBO(
                                                              245, 245, 245, 1),
                                                          borderRadius:
                                                              BorderRadius
                                                                  .circular(25),
                                                        ),
                                                        child: Padding(
                                                          padding:
                                                              const EdgeInsets
                                                                  .all(10.0),
                                                          child: Align(
                                                            alignment: Alignment
                                                                .center,
                                                            child: Text(
                                                              forms
                                                                  .products[
                                                                      index]
                                                                  .q2,
                                                              style:
                                                                  const TextStyle(
                                                                fontSize: 10,
                                                                color: Color
                                                                    .fromRGBO(
                                                                        133,
                                                                        142,
                                                                        173,
                                                                        1),
                                                              ),
                                                            ),
                                                          ),
                                                        ),
                                                      ),
                                                      const SizedBox(
                                                        height: 10,
                                                      ),
                                                    ],
                                                  ),
                                                  const SizedBox(
                                                    height: 20,
                                                  ),
                                                  Row(
                                                    children: [
                                                      Text(
                                                        forms.products[index]
                                                            .views,
                                                        style: const TextStyle(
                                                          color: Color.fromRGBO(
                                                              151, 152, 157, 1),
                                                          //fontWeight: FontWeight.bold,
                                                          fontSize: 10,
                                                        ),
                                                      ),
                                                      const SizedBox(
                                                        width: 10,
                                                      ),
                                                      Text(
                                                        forms.products[index]
                                                            .likes,
                                                        style: const TextStyle(
                                                          color: Color.fromRGBO(
                                                              151, 152, 157, 1),
                                                          //fontWeight: FontWeight.bold,
                                                          fontSize: 10,
                                                        ),
                                                      ),
                                                      const SizedBox(
                                                        width: 10,
                                                      ),
                                                      Text(
                                                        forms.products[index]
                                                            .ans,
                                                        style: const TextStyle(
                                                          color: Color.fromRGBO(
                                                              151, 152, 157, 1),
                                                          //fontWeight: FontWeight.bold,
                                                          fontSize: 10,
                                                        ),
                                                      ),
                                                    ],
                                                  ),
                                                ],
                                              ),
                                            ),
                                            Column(
                                              mainAxisAlignment:
                                                  MainAxisAlignment.start,
                                              children: [
                                                Image(
                                                  image: NetworkImage(forms
                                                      .products[index].avatar),
                                                  fit: BoxFit.contain,
                                                ),
                                              ],
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                  // Image(image: AssetImage('assets\images\Avatars.png')),
                                ],
                              ),
                            );
                          })),
                      ListView.builder(
                          physics: const BouncingScrollPhysics(),
                          itemCount: 8,
                          itemBuilder: ((context, index) {
                            return index < 4
                                ? SizedBox()
                                : Padding(
                                    padding: const EdgeInsets.all(5.0),
                                    child: Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.start,

                                      // crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        //1st
                                        InkWell(
                                          onTap: (() => Navigator.of(context)
                                              .push(MaterialPageRoute(
                                                  builder: ((context) =>
                                                      Communitynext(
                                                          indexes: index))))),
                                          child: Material(
                                            color: Colors.white,
                                            elevation: 5,
                                            borderRadius:
                                                const BorderRadius.all(
                                                    Radius.circular(15)),
                                            child: Container(
                                              margin: const EdgeInsets.fromLTRB(
                                                  10, 20, 20, 20),
                                              width: double.maxFinite,
                                              child: Row(
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.start,
                                                children: [
                                                  Image(
                                                      image: NetworkImage(
                                                        forms.products[index]
                                                            .images,
                                                      ),
                                                      fit: BoxFit.contain),
                                                  const SizedBox(
                                                    height: 10,
                                                  ),
                                                  Padding(
                                                    padding:
                                                        const EdgeInsets.all(
                                                            2.0),
                                                    child: Column(
                                                      children: [
                                                        Container(
                                                          width: 200,
                                                          child: Text(
                                                            forms
                                                                .products[index]
                                                                .ques,
                                                            style:
                                                                const TextStyle(
                                                              color:
                                                                  Colors.black,
                                                              height: 1.5,
                                                              fontSize: 15,
                                                              fontWeight:
                                                                  FontWeight
                                                                      .bold,
                                                            ),
                                                          ),
                                                        ),
                                                        SizedBox(
                                                          height: 10,
                                                        ),
                                                        Row(
                                                          mainAxisAlignment:
                                                              MainAxisAlignment
                                                                  .start,
                                                          children: [
                                                            Container(
                                                              decoration:
                                                                  BoxDecoration(
                                                                color: Color
                                                                    .fromRGBO(
                                                                        245,
                                                                        245,
                                                                        245,
                                                                        1),
                                                                borderRadius:
                                                                    BorderRadius
                                                                        .circular(
                                                                            25),
                                                              ),
                                                              child: Padding(
                                                                padding:
                                                                    EdgeInsets
                                                                        .all(
                                                                            10.0),
                                                                child: Align(
                                                                  alignment:
                                                                      Alignment
                                                                          .topLeft,
                                                                  child: Text(
                                                                    forms
                                                                        .products[
                                                                            index]
                                                                        .q1,
                                                                    style:
                                                                        TextStyle(
                                                                      fontSize:
                                                                          10,
                                                                      color: Color.fromRGBO(
                                                                          133,
                                                                          142,
                                                                          173,
                                                                          1),
                                                                    ),
                                                                  ),
                                                                ),
                                                              ),
                                                            ),
                                                            SizedBox(
                                                              width: 20,
                                                            ),
                                                            Container(
                                                              decoration:
                                                                  BoxDecoration(
                                                                color: Color
                                                                    .fromRGBO(
                                                                        245,
                                                                        245,
                                                                        245,
                                                                        1),
                                                                borderRadius:
                                                                    BorderRadius
                                                                        .circular(
                                                                            25),
                                                              ),
                                                              child: Padding(
                                                                padding:
                                                                    EdgeInsets
                                                                        .all(
                                                                            10.0),
                                                                child: Align(
                                                                  alignment:
                                                                      Alignment
                                                                          .center,
                                                                  child: Text(
                                                                    forms
                                                                        .products[
                                                                            index]
                                                                        .q2,
                                                                    style:
                                                                        TextStyle(
                                                                      fontSize:
                                                                          10,
                                                                      color: Color.fromRGBO(
                                                                          133,
                                                                          142,
                                                                          173,
                                                                          1),
                                                                    ),
                                                                  ),
                                                                ),
                                                              ),
                                                            ),
                                                            SizedBox(
                                                              height: 10,
                                                            ),
                                                          ],
                                                        ),
                                                        SizedBox(
                                                          height: 20,
                                                        ),
                                                        Row(
                                                          children: [
                                                            Text(
                                                              forms
                                                                  .products[
                                                                      index]
                                                                  .views,
                                                              style: TextStyle(
                                                                color: Color
                                                                    .fromRGBO(
                                                                        151,
                                                                        152,
                                                                        157,
                                                                        1),
                                                                //fontWeight: FontWeight.bold,
                                                                fontSize: 10,
                                                              ),
                                                            ),
                                                            SizedBox(
                                                              width: 10,
                                                            ),
                                                            Text(
                                                              forms
                                                                  .products[
                                                                      index]
                                                                  .likes,
                                                              style: TextStyle(
                                                                color: Color
                                                                    .fromRGBO(
                                                                        151,
                                                                        152,
                                                                        157,
                                                                        1),
                                                                //fontWeight: FontWeight.bold,
                                                                fontSize: 10,
                                                              ),
                                                            ),
                                                            SizedBox(
                                                              width: 10,
                                                            ),
                                                            Text(
                                                              forms
                                                                  .products[
                                                                      index]
                                                                  .ans,
                                                              style: TextStyle(
                                                                color: Color
                                                                    .fromRGBO(
                                                                        151,
                                                                        152,
                                                                        157,
                                                                        1),
                                                                //fontWeight: FontWeight.bold,
                                                                fontSize: 10,
                                                              ),
                                                            ),
                                                          ],
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                  Column(
                                                    mainAxisAlignment:
                                                        MainAxisAlignment.start,
                                                    children: [
                                                      Image(
                                                        image: NetworkImage(
                                                            forms
                                                                .products[index]
                                                                .avatar),
                                                        fit: BoxFit.contain,
                                                      ),
                                                    ],
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                        // Image(image: AssetImage('assets\images\Avatars.png')),
                                      ],
                                    ),
                                  );
                          })),
                      ListView.builder(
                          physics: const BouncingScrollPhysics(),
                          itemCount: 12,
                          itemBuilder: ((context, index) {
                            return index < 8
                                ? SizedBox()
                                : Padding(
                                    padding: const EdgeInsets.all(5.0),
                                    child: Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.start,

                                      // crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        //1st
                                        InkWell(
                                          onTap: (() => Navigator.of(context)
                                              .push(MaterialPageRoute(
                                                  builder: ((context) =>
                                                      Communitynext(
                                                          indexes: index))))),
                                          child: Material(
                                            color: Colors.white,
                                            elevation: 5,
                                            borderRadius:
                                                const BorderRadius.all(
                                                    Radius.circular(15)),
                                            child: Container(
                                              margin: const EdgeInsets.fromLTRB(
                                                  10, 20, 20, 20),
                                              width: double.maxFinite,
                                              child: Row(
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.start,
                                                children: [
                                                  Image(
                                                      image: NetworkImage(
                                                        forms.products[index]
                                                            .images,
                                                      ),
                                                      fit: BoxFit.contain),
                                                  const SizedBox(
                                                    height: 10,
                                                  ),
                                                  Padding(
                                                    padding:
                                                        const EdgeInsets.all(
                                                            2.0),
                                                    child: Column(
                                                      children: [
                                                        Container(
                                                          width: 200,
                                                          child: Text(
                                                            forms
                                                                .products[index]
                                                                .ques,
                                                            style: TextStyle(
                                                              color:
                                                                  Colors.black,
                                                              height: 1.5,
                                                              fontSize: 15,
                                                              fontWeight:
                                                                  FontWeight
                                                                      .bold,
                                                            ),
                                                          ),
                                                        ),
                                                        SizedBox(
                                                          height: 10,
                                                        ),
                                                        Row(
                                                          mainAxisAlignment:
                                                              MainAxisAlignment
                                                                  .start,
                                                          children: [
                                                            Container(
                                                              decoration:
                                                                  BoxDecoration(
                                                                color: Color
                                                                    .fromRGBO(
                                                                        245,
                                                                        245,
                                                                        245,
                                                                        1),
                                                                borderRadius:
                                                                    BorderRadius
                                                                        .circular(
                                                                            25),
                                                              ),
                                                              child: Padding(
                                                                padding:
                                                                    EdgeInsets
                                                                        .all(
                                                                            10.0),
                                                                child: Align(
                                                                  alignment:
                                                                      Alignment
                                                                          .topLeft,
                                                                  child: Text(
                                                                    forms
                                                                        .products[
                                                                            index]
                                                                        .q1,
                                                                    style:
                                                                        TextStyle(
                                                                      fontSize:
                                                                          10,
                                                                      color: Color.fromRGBO(
                                                                          133,
                                                                          142,
                                                                          173,
                                                                          1),
                                                                    ),
                                                                  ),
                                                                ),
                                                              ),
                                                            ),
                                                            SizedBox(
                                                              width: 20,
                                                            ),
                                                            Container(
                                                              decoration:
                                                                  BoxDecoration(
                                                                color: Color
                                                                    .fromRGBO(
                                                                        245,
                                                                        245,
                                                                        245,
                                                                        1),
                                                                borderRadius:
                                                                    BorderRadius
                                                                        .circular(
                                                                            25),
                                                              ),
                                                              child: Padding(
                                                                padding:
                                                                    EdgeInsets
                                                                        .all(
                                                                            10.0),
                                                                child: Align(
                                                                  alignment:
                                                                      Alignment
                                                                          .center,
                                                                  child: Text(
                                                                    forms
                                                                        .products[
                                                                            index]
                                                                        .q2,
                                                                    style:
                                                                        TextStyle(
                                                                      fontSize:
                                                                          10,
                                                                      color: Color.fromRGBO(
                                                                          133,
                                                                          142,
                                                                          173,
                                                                          1),
                                                                    ),
                                                                  ),
                                                                ),
                                                              ),
                                                            ),
                                                            SizedBox(
                                                              height: 10,
                                                            ),
                                                          ],
                                                        ),
                                                        SizedBox(
                                                          height: 20,
                                                        ),
                                                        Row(
                                                          children: [
                                                            Text(
                                                              forms
                                                                  .products[
                                                                      index]
                                                                  .views,
                                                              style: TextStyle(
                                                                color: Color
                                                                    .fromRGBO(
                                                                        151,
                                                                        152,
                                                                        157,
                                                                        1),
                                                                //fontWeight: FontWeight.bold,
                                                                fontSize: 10,
                                                              ),
                                                            ),
                                                            SizedBox(
                                                              width: 10,
                                                            ),
                                                            Text(
                                                              forms
                                                                  .products[
                                                                      index]
                                                                  .likes,
                                                              style: TextStyle(
                                                                color: Color
                                                                    .fromRGBO(
                                                                        151,
                                                                        152,
                                                                        157,
                                                                        1),
                                                                //fontWeight: FontWeight.bold,
                                                                fontSize: 10,
                                                              ),
                                                            ),
                                                            SizedBox(
                                                              width: 10,
                                                            ),
                                                            Text(
                                                              forms
                                                                  .products[
                                                                      index]
                                                                  .ans,
                                                              style: TextStyle(
                                                                color: Color
                                                                    .fromRGBO(
                                                                        151,
                                                                        152,
                                                                        157,
                                                                        1),
                                                                //fontWeight: FontWeight.bold,
                                                                fontSize: 10,
                                                              ),
                                                            ),
                                                          ],
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                  Column(
                                                    mainAxisAlignment:
                                                        MainAxisAlignment.start,
                                                    children: [
                                                      Image(
                                                        image: NetworkImage(
                                                            forms
                                                                .products[index]
                                                                .avatar),
                                                        fit: BoxFit.contain,
                                                      ),
                                                    ],
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                        // Image(image: AssetImage('assets\images\Avatars.png')),
                                      ],
                                    ),
                                  );
                          })),
                      ListView.builder(
                          physics: const BouncingScrollPhysics(),
                          itemCount: 16,
                          itemBuilder: ((context, index) {
                            return index < 12
                                ? SizedBox()
                                : Padding(
                                    padding: const EdgeInsets.all(5.0),
                                    child: Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.start,

                                      // crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        //1st
                                        InkWell(
                                          onTap: (() => Navigator.of(context)
                                              .push(MaterialPageRoute(
                                                  builder: ((context) =>
                                                      Communitynext(
                                                          indexes: index))))),
                                          child: Material(
                                            color: Colors.white,
                                            elevation: 5,
                                            borderRadius:
                                                const BorderRadius.all(
                                                    Radius.circular(15)),
                                            child: Container(
                                              margin: const EdgeInsets.fromLTRB(
                                                  10, 20, 20, 20),
                                              width: double.maxFinite,
                                              child: Row(
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.start,
                                                children: [
                                                  Image(
                                                      image: NetworkImage(
                                                        forms.products[index]
                                                            .images,
                                                      ),
                                                      fit: BoxFit.contain),
                                                  const SizedBox(
                                                    height: 10,
                                                  ),
                                                  Padding(
                                                    padding:
                                                        const EdgeInsets.all(
                                                            2.0),
                                                    child: Column(
                                                      children: [
                                                        Container(
                                                          width: 200,
                                                          child: Text(
                                                            forms
                                                                .products[index]
                                                                .ques,
                                                            style: TextStyle(
                                                              color:
                                                                  Colors.black,
                                                              height: 1.5,
                                                              fontSize: 15,
                                                              fontWeight:
                                                                  FontWeight
                                                                      .bold,
                                                            ),
                                                          ),
                                                        ),
                                                        SizedBox(
                                                          height: 10,
                                                        ),
                                                        Row(
                                                          mainAxisAlignment:
                                                              MainAxisAlignment
                                                                  .start,
                                                          children: [
                                                            Container(
                                                              decoration:
                                                                  BoxDecoration(
                                                                color: Color
                                                                    .fromRGBO(
                                                                        245,
                                                                        245,
                                                                        245,
                                                                        1),
                                                                borderRadius:
                                                                    BorderRadius
                                                                        .circular(
                                                                            25),
                                                              ),
                                                              child: Padding(
                                                                padding:
                                                                    EdgeInsets
                                                                        .all(
                                                                            10.0),
                                                                child: Align(
                                                                  alignment:
                                                                      Alignment
                                                                          .topLeft,
                                                                  child: Text(
                                                                    forms
                                                                        .products[
                                                                            index]
                                                                        .q1,
                                                                    style:
                                                                        TextStyle(
                                                                      fontSize:
                                                                          10,
                                                                      color: Color.fromRGBO(
                                                                          133,
                                                                          142,
                                                                          173,
                                                                          1),
                                                                    ),
                                                                  ),
                                                                ),
                                                              ),
                                                            ),
                                                            SizedBox(
                                                              width: 20,
                                                            ),
                                                            Container(
                                                              decoration:
                                                                  BoxDecoration(
                                                                color: Color
                                                                    .fromRGBO(
                                                                        245,
                                                                        245,
                                                                        245,
                                                                        1),
                                                                borderRadius:
                                                                    BorderRadius
                                                                        .circular(
                                                                            25),
                                                              ),
                                                              child: Padding(
                                                                padding:
                                                                    EdgeInsets
                                                                        .all(
                                                                            10.0),
                                                                child: Align(
                                                                  alignment:
                                                                      Alignment
                                                                          .center,
                                                                  child: Text(
                                                                    forms
                                                                        .products[
                                                                            index]
                                                                        .q2,
                                                                    style:
                                                                        TextStyle(
                                                                      fontSize:
                                                                          10,
                                                                      color: Color.fromRGBO(
                                                                          133,
                                                                          142,
                                                                          173,
                                                                          1),
                                                                    ),
                                                                  ),
                                                                ),
                                                              ),
                                                            ),
                                                            SizedBox(
                                                              height: 10,
                                                            ),
                                                          ],
                                                        ),
                                                        SizedBox(
                                                          height: 20,
                                                        ),
                                                        Row(
                                                          children: [
                                                            Text(
                                                              forms
                                                                  .products[
                                                                      index]
                                                                  .views,
                                                              style: TextStyle(
                                                                color: Color
                                                                    .fromRGBO(
                                                                        151,
                                                                        152,
                                                                        157,
                                                                        1),
                                                                //fontWeight: FontWeight.bold,
                                                                fontSize: 10,
                                                              ),
                                                            ),
                                                            SizedBox(
                                                              width: 10,
                                                            ),
                                                            Text(
                                                              forms
                                                                  .products[
                                                                      index]
                                                                  .likes,
                                                              style: TextStyle(
                                                                color: Color
                                                                    .fromRGBO(
                                                                        151,
                                                                        152,
                                                                        157,
                                                                        1),
                                                                //fontWeight: FontWeight.bold,
                                                                fontSize: 10,
                                                              ),
                                                            ),
                                                            SizedBox(
                                                              width: 10,
                                                            ),
                                                            Text(
                                                              forms
                                                                  .products[
                                                                      index]
                                                                  .ans,
                                                              style: TextStyle(
                                                                color: Color
                                                                    .fromRGBO(
                                                                        151,
                                                                        152,
                                                                        157,
                                                                        1),
                                                                //fontWeight: FontWeight.bold,
                                                                fontSize: 10,
                                                              ),
                                                            ),
                                                          ],
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                  Column(
                                                    mainAxisAlignment:
                                                        MainAxisAlignment.start,
                                                    children: [
                                                      Image(
                                                        image: NetworkImage(
                                                            forms
                                                                .products[index]
                                                                .avatar),
                                                        fit: BoxFit.contain,
                                                      ),
                                                    ],
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                        // Image(image: AssetImage('assets\images\Avatars.png')),
                                      ],
                                    ),
                                  );
                          })),
                      ListView.builder(
                          physics: const BouncingScrollPhysics(),
                          itemCount: 20,
                          itemBuilder: ((context, index) {
                            return index < 16
                                ? SizedBox()
                                : Padding(
                                    padding: const EdgeInsets.all(5.0),
                                    child: Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.start,

                                      // crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        //1st
                                        InkWell(
                                          onTap: (() => Navigator.of(context)
                                              .push(MaterialPageRoute(
                                                  builder: ((context) =>
                                                      Communitynext(
                                                          indexes: index))))),
                                          child: Material(
                                            color: Colors.white,
                                            elevation: 5,
                                            borderRadius:
                                                const BorderRadius.all(
                                                    Radius.circular(15)),
                                            child: Container(
                                              margin: const EdgeInsets.fromLTRB(
                                                  10, 20, 20, 20),
                                              width: double.maxFinite,
                                              child: Row(
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.start,
                                                children: [
                                                  Image(
                                                      image: NetworkImage(
                                                        forms.products[index]
                                                            .images,
                                                      ),
                                                      fit: BoxFit.contain),
                                                  const SizedBox(
                                                    height: 10,
                                                  ),
                                                  Padding(
                                                    padding:
                                                        const EdgeInsets.all(
                                                            2.0),
                                                    child: Column(
                                                      children: [
                                                        Container(
                                                          width: 200,
                                                          child: Text(
                                                            forms
                                                                .products[index]
                                                                .ques,
                                                            style: TextStyle(
                                                              color:
                                                                  Colors.black,
                                                              height: 1.5,
                                                              fontSize: 15,
                                                              fontWeight:
                                                                  FontWeight
                                                                      .bold,
                                                            ),
                                                          ),
                                                        ),
                                                        SizedBox(
                                                          height: 10,
                                                        ),
                                                        Row(
                                                          mainAxisAlignment:
                                                              MainAxisAlignment
                                                                  .start,
                                                          children: [
                                                            Container(
                                                              decoration:
                                                                  BoxDecoration(
                                                                color: Color
                                                                    .fromRGBO(
                                                                        245,
                                                                        245,
                                                                        245,
                                                                        1),
                                                                borderRadius:
                                                                    BorderRadius
                                                                        .circular(
                                                                            25),
                                                              ),
                                                              child: Padding(
                                                                padding:
                                                                    EdgeInsets
                                                                        .all(
                                                                            10.0),
                                                                child: Align(
                                                                  alignment:
                                                                      Alignment
                                                                          .topLeft,
                                                                  child: Text(
                                                                    forms
                                                                        .products[
                                                                            index]
                                                                        .q1,
                                                                    style:
                                                                        const TextStyle(
                                                                      fontSize:
                                                                          10,
                                                                      color: Color.fromRGBO(
                                                                          133,
                                                                          142,
                                                                          173,
                                                                          1),
                                                                    ),
                                                                  ),
                                                                ),
                                                              ),
                                                            ),
                                                            const SizedBox(
                                                              width: 20,
                                                            ),
                                                            Container(
                                                              decoration:
                                                                  BoxDecoration(
                                                                color: const Color
                                                                        .fromRGBO(
                                                                    245,
                                                                    245,
                                                                    245,
                                                                    1),
                                                                borderRadius:
                                                                    BorderRadius
                                                                        .circular(
                                                                            25),
                                                              ),
                                                              child: Padding(
                                                                padding:
                                                                    const EdgeInsets
                                                                            .all(
                                                                        10.0),
                                                                child: Align(
                                                                  alignment:
                                                                      Alignment
                                                                          .center,
                                                                  child: Text(
                                                                    forms
                                                                        .products[
                                                                            index]
                                                                        .q2,
                                                                    style:
                                                                        const TextStyle(
                                                                      fontSize:
                                                                          10,
                                                                      color: Color.fromRGBO(
                                                                          133,
                                                                          142,
                                                                          173,
                                                                          1),
                                                                    ),
                                                                  ),
                                                                ),
                                                              ),
                                                            ),
                                                            const SizedBox(
                                                              height: 10,
                                                            ),
                                                          ],
                                                        ),
                                                        const SizedBox(
                                                          height: 20,
                                                        ),
                                                        Row(
                                                          children: [
                                                            Text(
                                                              forms
                                                                  .products[
                                                                      index]
                                                                  .views,
                                                              style:
                                                                  const TextStyle(
                                                                color: Color
                                                                    .fromRGBO(
                                                                        151,
                                                                        152,
                                                                        157,
                                                                        1),
                                                                //fontWeight: FontWeight.bold,
                                                                fontSize: 10,
                                                              ),
                                                            ),
                                                            const SizedBox(
                                                              width: 10,
                                                            ),
                                                            Text(
                                                              forms
                                                                  .products[
                                                                      index]
                                                                  .likes,
                                                              style:
                                                                  const TextStyle(
                                                                color: Color
                                                                    .fromRGBO(
                                                                        151,
                                                                        152,
                                                                        157,
                                                                        1),
                                                                //fontWeight: FontWeight.bold,
                                                                fontSize: 10,
                                                              ),
                                                            ),
                                                            SizedBox(
                                                              width: 10,
                                                            ),
                                                            Text(
                                                              forms
                                                                  .products[
                                                                      index]
                                                                  .ans,
                                                              style: TextStyle(
                                                                color: Color
                                                                    .fromRGBO(
                                                                        151,
                                                                        152,
                                                                        157,
                                                                        1),
                                                                //fontWeight: FontWeight.bold,
                                                                fontSize: 10,
                                                              ),
                                                            ),
                                                          ],
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                  Column(
                                                    mainAxisAlignment:
                                                        MainAxisAlignment.start,
                                                    children: [
                                                      Image(
                                                        image: NetworkImage(
                                                            forms
                                                                .products[index]
                                                                .avatar),
                                                        fit: BoxFit.contain,
                                                      ),
                                                    ],
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                        // Image(image: AssetImage('assets\images\Avatars.png')),
                                      ],
                                    ),
                                  );
                          })),
                    ],
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
