import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:liquid_pull_to_refresh/liquid_pull_to_refresh.dart';
import 'package:sih_2022/screens/screens.dart';

import '../../../controllers/article/article_controller.dart';
import '../../../controllers/common/translator.dart';
import 'article_page2.dart';

TextStyle st(Color colors) {
  return TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: colors);
}

class ArticleSection extends StatefulWidget {
  const ArticleSection({Key? key}) : super(key: key);

  @override
  State<ArticleSection> createState() => _ArticleSectionState();
}

class _ArticleSectionState extends State<ArticleSection>
    with TickerProviderStateMixin {
  final productController = Get.put(ArticleController());
  @override
  Widget build(BuildContext context) {
    TabController tabcontoller = TabController(length: 4, vsync: this);
    return WillPopScope(
      onWillPop: () {
        Get.put(LanguageController());
        Navigator.popAndPushNamed(context, HomeScreen.routeName);
        return Future.delayed(Duration(seconds: 1));
      },
      child: Scaffold(
        body: SafeArea(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(10, 0, 0, 0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Padding(
                  padding: EdgeInsets.fromLTRB(20, 30, 20, 0),
                  child: TextField(
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
                      // hoverColor: Colors.blueGrey,
                      hintText: "Search here",
                      suffixIcon: Icon(Icons.search_rounded),
                    ),
                    // onChanged:updateList,
                  ),
                ),
                const SizedBox(
                  height: 15,
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(25, 0, 0, 5),
                  child: const Text(
                    "Explore",
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 24,
                    ),
                  ),
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
                      labelPadding: const EdgeInsets.symmetric(horizontal: 10),
                      automaticIndicatorColorAdjustment: true,
                      tabs: [
                        Tab(
                          child: Container(
                            width: 105,
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
                            width: 105,
                            decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(25),
                                border: Border.all(
                                    color: Colors.redAccent, width: 1)),
                            child: const Padding(
                              padding: EdgeInsets.all(10.0),
                              child: Align(
                                alignment: Alignment.center,
                                child: Text("\Psycomotive"),
                              ),
                            ),
                          ),
                        ),
                        Tab(
                          child: Container(
                            width: 105,
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
                            width: 105,
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
                      ]),
                ),
                const SizedBox(
                  height: 20,
                ),
                Expanded(
                  child: TabBarView(controller: tabcontoller, children: [
                    LiquidPullToRefresh(
                      color: Colors.redAccent,
                      onRefresh: () async {
                        Future.delayed(Duration(milliseconds: 1));
                        productController.getAllData();
                      },
                      animSpeedFactor: 3,
                      child:
                          GetBuilder<ArticleController>(builder: (controller) {
                        return ListView.builder(
                          itemBuilder: (context, index) {
                            return Padding(
                              padding: const EdgeInsets.fromLTRB(10, 4, 10, 4),
                              child: InkWell(
                                onTap: () {
                                  Navigator.of(context).push(MaterialPageRoute(
                                      builder: (context) => ArticlePage2(
                                            index2: index,
                                          )));
                                },
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    //1st
                                    Material(
                                      elevation: 5,
                                      borderRadius: const BorderRadius.all(
                                          Radius.circular(15)),
                                      child: Container(
                                        margin: const EdgeInsets.fromLTRB(
                                            40, 20, 20, 20),
                                        width: double.maxFinite,
                                        child: Column(
                                          children: [
                                            Row(
                                              children: [
                                                Container(
                                                  alignment:
                                                      Alignment.centerLeft,
                                                  child: const Text(
                                                    "Read Time:5 min",
                                                    style: TextStyle(
                                                        color: Colors.red,
                                                        fontSize: 12),
                                                  ),
                                                ),
                                                const Spacer(),
                                                Container(
                                                  alignment:
                                                      Alignment.centerRight,
                                                  child: Text(
                                                    "${productController.productData[index].time}",
                                                    style: TextStyle(
                                                        color: Colors.red,
                                                        fontSize: 12),
                                                  ),
                                                ),
                                              ],
                                            ),
                                            const SizedBox(
                                              height: 10,
                                            ),
                                            Align(
                                              alignment: Alignment.topLeft,
                                              child: Text(
                                                '${productController.productData[index].title}',
                                                style: TextStyle(
                                                  color: Colors.black,
                                                  fontSize: 20,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                              ),
                                            ),
                                            const SizedBox(
                                              height: 10,
                                            ),
                                            Text(
                                              "${productController.productData[index].description}",
                                              style: TextStyle(
                                                color: Color.fromARGB(
                                                    255, 183, 178, 178),
                                                fontSize: 12,
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                            const SizedBox(
                                              height: 10,
                                            ),
                                            Row(
                                              mainAxisAlignment:
                                                  MainAxisAlignment.start,
                                              children: const [
                                                Icon(
                                                  Icons
                                                      .favorite_border_outlined,
                                                  size: 15,
                                                  color: Color.fromARGB(
                                                      255, 106, 101, 101),
                                                ),
                                                Icon(
                                                  Icons.bookmark_add_outlined,
                                                  size: 15,
                                                  color: Color.fromARGB(
                                                      255, 106, 101, 101),
                                                ),
                                                Icon(
                                                  Icons.share,
                                                  size: 15,
                                                  color: Color.fromARGB(
                                                      255, 106, 101, 101),
                                                ),
                                              ],
                                            )
                                          ],
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            );
                          },
                          itemCount: productController.productData.length,
                        );
                      }),
                    ),
                    ListView.builder(
                        physics: const BouncingScrollPhysics(),
                        itemCount: 3,
                        itemBuilder: ((context, index) {
                          return Padding(
                            padding: const EdgeInsets.all(5.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                //1st
                                Material(
                                  elevation: 5,
                                  borderRadius: const BorderRadius.all(
                                      Radius.circular(15)),
                                  child: Container(
                                    margin: const EdgeInsets.fromLTRB(
                                        40, 20, 20, 20),
                                    width: double.maxFinite,
                                    child: Column(
                                      children: [
                                        Row(
                                          children: [
                                            Container(
                                              alignment: Alignment.centerLeft,
                                              child: const Text(
                                                "Read Time:5 min",
                                                style: TextStyle(
                                                    color: Colors.red,
                                                    fontSize: 12),
                                              ),
                                            ),
                                            const Spacer(),
                                            Container(
                                              alignment: Alignment.centerRight,
                                              child: const Text(
                                                "10 March,2022",
                                                style: TextStyle(
                                                    color: Colors.red,
                                                    fontSize: 12),
                                              ),
                                            ),
                                          ],
                                        ),
                                        const SizedBox(
                                          height: 10,
                                        ),
                                        const Text(
                                          "What is the importance of Cognitive Development in child's growth",
                                          style: TextStyle(
                                            color: Colors.black,
                                            fontSize: 18,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        const SizedBox(
                                          height: 10,
                                        ),
                                        const Text(
                                          "Children grow and develop rapidly in their first five years across the four main areas of development. These areas are motor (physical), language and communication, cognitive and social/emotional.",
                                          style: TextStyle(
                                            color: Color.fromARGB(
                                                255, 183, 178, 178),
                                            fontSize: 12,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        const SizedBox(
                                          height: 10,
                                        ),
                                        Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.start,
                                          children: const [
                                            Icon(
                                              Icons.favorite_border_outlined,
                                              size: 15,
                                              color: Color.fromARGB(
                                                  255, 106, 101, 101),
                                            ),
                                            Icon(
                                              Icons.bookmark_add_outlined,
                                              size: 15,
                                              color: Color.fromARGB(
                                                  255, 106, 101, 101),
                                            ),
                                            Icon(
                                              Icons.share,
                                              size: 15,
                                              color: Color.fromARGB(
                                                  255, 106, 101, 101),
                                            ),
                                          ],
                                        )
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          );
                        })),
                    ListView.builder(
                        physics: const BouncingScrollPhysics(),
                        itemCount: 3,
                        itemBuilder: ((context, index) {
                          return Padding(
                            padding: const EdgeInsets.all(5.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                //1st
                                Material(
                                  elevation: 5,
                                  borderRadius: const BorderRadius.all(
                                      Radius.circular(15)),
                                  child: Container(
                                    margin: const EdgeInsets.fromLTRB(
                                        40, 20, 20, 20),
                                    width: double.maxFinite,
                                    child: Column(
                                      children: [
                                        Row(
                                          children: [
                                            Container(
                                              alignment: Alignment.centerLeft,
                                              child: const Text(
                                                "Read Time:5 min",
                                                style: TextStyle(
                                                    color: Colors.red,
                                                    fontSize: 12),
                                              ),
                                            ),
                                            const Spacer(),
                                            Container(
                                              alignment: Alignment.centerRight,
                                              child: const Text(
                                                "10 March,2022",
                                                style: TextStyle(
                                                    color: Colors.red,
                                                    fontSize: 12),
                                              ),
                                            ),
                                          ],
                                        ),
                                        const SizedBox(
                                          height: 10,
                                        ),
                                        const Text(
                                          "What is the importance of Cognitive Development in child's growth",
                                          style: TextStyle(
                                            color: Colors.black,
                                            fontSize: 18,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        const SizedBox(
                                          height: 10,
                                        ),
                                        const Text(
                                          "Children grow and develop rapidly in their first five years across the four main areas of development. These areas are motor (physical), language and communication, cognitive and social/emotional. ",
                                          style: TextStyle(
                                            color: Color.fromARGB(
                                                255, 183, 178, 178),
                                            fontSize: 12,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        const SizedBox(
                                          height: 10,
                                        ),
                                        Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.start,
                                          children: const [
                                            Icon(
                                              Icons.favorite_border_outlined,
                                              size: 15,
                                              color: Color.fromARGB(
                                                  255, 106, 101, 101),
                                            ),
                                            Icon(
                                              Icons.bookmark_add_outlined,
                                              size: 15,
                                              color: Color.fromARGB(
                                                  255, 106, 101, 101),
                                            ),
                                            Icon(
                                              Icons.share,
                                              size: 15,
                                              color: Color.fromARGB(
                                                  255, 106, 101, 101),
                                            ),
                                          ],
                                        )
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          );
                        })),
                    ListView.builder(
                        physics: const BouncingScrollPhysics(),
                        itemCount: 3,
                        itemBuilder: ((context, index) {
                          return Padding(
                            padding: const EdgeInsets.all(5.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                //1st
                                Material(
                                  elevation: 5,
                                  borderRadius: const BorderRadius.all(
                                      Radius.circular(15)),
                                  child: Container(
                                    margin: const EdgeInsets.fromLTRB(
                                        40, 20, 20, 20),
                                    width: double.maxFinite,
                                    child: Column(
                                      children: [
                                        Row(
                                          children: [
                                            Container(
                                              alignment: Alignment.centerLeft,
                                              child: const Text(
                                                "Read Time:5 min",
                                                style: TextStyle(
                                                    color: Colors.red,
                                                    fontSize: 12),
                                              ),
                                            ),
                                            const Spacer(),
                                            Container(
                                              alignment: Alignment.centerRight,
                                              child: const Text(
                                                "10 March,2022",
                                                style: TextStyle(
                                                    color: Colors.red,
                                                    fontSize: 12),
                                              ),
                                            ),
                                          ],
                                        ),
                                        const SizedBox(
                                          height: 10,
                                        ),
                                        const Text(
                                          "What is the importance of Cognitive Development in child's growth",
                                          style: TextStyle(
                                            color: Colors.black,
                                            fontSize: 18,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        const SizedBox(
                                          height: 10,
                                        ),
                                        const Text(
                                          "Children grow and develop rapidly in their first five years across the four main areas of development. These areas are motor (physical), language and communication, cognitive and social/emotional. ",
                                          style: TextStyle(
                                            color: Color.fromARGB(
                                                255, 183, 178, 178),
                                            fontSize: 12,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        const SizedBox(
                                          height: 10,
                                        ),
                                        Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.start,
                                          children: const [
                                            Icon(
                                              Icons.favorite_border_outlined,
                                              size: 15,
                                              color: Color.fromARGB(
                                                  255, 106, 101, 101),
                                            ),
                                            Icon(
                                              Icons.bookmark_add_outlined,
                                              size: 15,
                                              color: Color.fromARGB(
                                                  255, 106, 101, 101),
                                            ),
                                            Icon(
                                              Icons.share,
                                              size: 15,
                                              color: Color.fromARGB(
                                                  255, 106, 101, 101),
                                            ),
                                          ],
                                        )
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          );
                        })),
                  ]),
                ),
                // Expanded(
                //   child: TabBarView(
                //     controller: tabcontoller,
                //     children: [
                //       ListView.builder(
                //           physics: const BouncingScrollPhysics(),
                //           itemCount: 3,
                //           itemBuilder: ((context, index) {
                //             return Padding(
                //               padding: const EdgeInsets.all(5.0),
                //               child: Column(
                //                 crossAxisAlignment: CrossAxisAlignment.start,
                //                 children: [
                //                   //1st
                //                   Material(
                //                     elevation: 5,
                //                     borderRadius: const BorderRadius.all(
                //                         Radius.circular(15)),
                //                     child: Container(
                //                       margin: const EdgeInsets.fromLTRB(
                //                           40, 20, 20, 20),
                //                       width: double.maxFinite,
                //                       child: Column(
                //                         children: [
                //                           Row(
                //                             children: [
                //                               Container(
                //                                 alignment: Alignment.centerLeft,
                //                                 child: const Text(
                //                                   "Read Time:5 min",
                //                                   style: TextStyle(
                //                                       color: Colors.red,
                //                                       fontSize: 12),
                //                                 ),
                //                               ),
                //                               const Spacer(),
                //                               Container(
                //                                 alignment: Alignment.centerRight,
                //                                 child: const Text(
                //                                   "10 March,2022",
                //                                   style: TextStyle(
                //                                       color: Colors.red,
                //                                       fontSize: 12),
                //                                 ),
                //                               ),
                //                             ],
                //                           ),
                //                           const SizedBox(
                //                             height: 10,
                //                           ),
                //                           const Text(
                //                             "What is the importance of Cognitive Development in child's growth",
                //                             style: TextStyle(
                //                               color: Colors.black,
                //                               fontSize: 18,
                //                               fontWeight: FontWeight.bold,
                //                             ),
                //                           ),
                //                           const SizedBox(
                //                             height: 10,
                //                           ),
                //                           const Text(
                //                             "Children grow and develop rapidly in their first five years across the four main areas of development. These areas are motor (physical), language and communication, cognitive and social/emotional.",
                //                             style: TextStyle(
                //                               color: Color.fromARGB(
                //                                   255, 183, 178, 178),
                //                               fontSize: 12,
                //                               fontWeight: FontWeight.bold,
                //                             ),
                //                           ),
                //                           const SizedBox(
                //                             height: 10,
                //                           ),
                //                           Row(
                //                             mainAxisAlignment:
                //                                 MainAxisAlignment.start,
                //                             children: const [
                //                               Icon(
                //                                 Icons.favorite_border_outlined,
                //                                 size: 15,
                //                                 color: Color.fromARGB(
                //                                     255, 106, 101, 101),
                //                               ),
                //                               Icon(
                //                                 Icons.bookmark_add_outlined,
                //                                 size: 15,
                //                                 color: Color.fromARGB(
                //                                     255, 106, 101, 101),
                //                               ),
                //                               Icon(
                //                                 Icons.share,
                //                                 size: 15,
                //                                 color: Color.fromARGB(
                //                                     255, 106, 101, 101),
                //                               ),
                //                             ],
                //                           )
                //                         ],
                //                       ),
                //                     ),
                //                   ),
                //                 ],
                //               ),
                //             );
                //           })),

                //     ],
                //   ),
                // )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
