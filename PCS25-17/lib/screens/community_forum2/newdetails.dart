import 'package:flutter/material.dart';
import 'package:sih_2022/screens/community_forum2/specially_class.dart';

class DetailsPage extends StatefulWidget {
  final Item items;
  const DetailsPage({
    Key? key,
    required this.items,
  }) : super(key: key);

  @override
  State<DetailsPage> createState() => _DetailsPageState();
}

class _DetailsPageState extends State<DetailsPage> {
  final nostars = 4;
  bool val = false;
  @override
  Widget build(BuildContext context) {
    return Hero(
      tag: widget.items.id,
      child: SafeArea(
        child: Scaffold(
          body: Container(
            height: double.maxFinite,
            width: double.maxFinite,
            child: Stack(
              children: [
                Positioned(
                  left: 0,
                  right: 0,
                  child: Container(
                    // color: Colors.green,
                    width: double.maxFinite,
                    height: 350,
                    decoration: BoxDecoration(
                        image: DecorationImage(
                            image: NetworkImage(widget.items.image),
                            fit: BoxFit.cover)),
                  ),
                ),
                Row(
                  children: [
                    Positioned(
                        left: 10,
                        right: 20,
                        top: 500,
                        child: Row(
                          children: [
                            IconButton(
                              onPressed: () {
                                Navigator.pop(context);
                              },
                              icon: const Icon(
                                Icons.arrow_back_ios_new_rounded,
                                color: Colors.white,
                              ),
                              iconSize: 30,
                            ),
                          ],
                        )),
                  ],
                ),
                Positioned(
                  top: 300,
                  left: 0,
                  right: 0,
                  child: Container(
                    padding:
                        const EdgeInsets.only(left: 20, top: 40, right: 20),
                    // color: Colors.white,
                    width: MediaQuery.of(context).size.width,
                    height: 1500,
                    decoration: const BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(50),
                          topRight: Radius.circular(50),
                        )),

                    // padding: const EdgeInsets.all(20.0),
                    child: Column(
                      // mainAxisAlignment: Alignment.left,
                      children: [
                        Text(
                          widget.items.schoolname,
                          style: const TextStyle(
                            fontSize: 28,
                            fontWeight: FontWeight.bold,
                            // fontStyle: FontStyle.italic,
                            fontFamily: 'Open Sans',
                          ),
                        ),
                        const SizedBox(
                          height: 20,
                        ),
                        Row(
                          children: [
                            const Icon(
                              Icons.location_on,
                              color: Colors.blueGrey,
                            ),
                            Flexible(
                              child: Container(
                                // padding: const EdgeInsets.only( right: 120),
                                width: MediaQuery.of(context).size.width,
                                child: Text(
                                  widget.items.location,
                                  style: const TextStyle(
                                    color: Color.fromARGB(255, 142, 139, 139),
                                    // overflow: TextOverflow.fade,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        Container(
                          padding: const EdgeInsets.only(left: 15),
                          child: Row(
                            children: [
                              Wrap(
                                  children: List.generate(5, (index) {
                                return Icon(
                                  Icons.star,
                                  color: nostars > index
                                      ? const Color.fromARGB(255, 243, 230, 117)
                                      : Colors.grey,
                                );
                              })),
                              const Text("(4.0)"),
                            ],
                          ),
                        ),
                        const SizedBox(
                          height: 30,
                        ),
                        Row(
                          children: [
                            Text("Details :  ",
                                style: TextStyle(
                                  color: Colors.black.withOpacity(0.8),
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                )),
                          ],
                        ),
                        const SizedBox(
                          height: 20,
                        ),
                        Row(
                          children: [
                            Flexible(
                              child: Container(
                                child: const Text(
                                  "Contact Info :  ",
                                  style: TextStyle(
                                    color: Colors.red,
                                    fontSize: 15,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ),
                            Text(widget.items.contact, softWrap: true),
                          ],
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        Flexible(
                          child: Container(
                            child: Row(
                              children: [
                                const Text(
                                  "Email-Id :  ",
                                  style: TextStyle(
                                    color: Colors.red,
                                    fontSize: 15,
                                    fontWeight: FontWeight.bold,
                                  ),
                                  overflow: TextOverflow.visible,
                                ),
                                Text(widget.items.email),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        Row(
                          children: [
                            const Text(
                              "About :  ",
                              style: TextStyle(
                                color: Colors.red,
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Text(widget.items.speciality),
                          ],
                        ),
                        const SizedBox(
                          height: 50,
                        ),
                        Center(
                          child: Container(
                            padding: EdgeInsets.only(left: 136),
                            child: Row(children: [
                              IconButton(
                                onPressed: (() {
                                  setState(() {
                                    val == true ? val = false : val = true;
                                  });
                                }),
                                icon: Icon(
                                  Icons.favorite_rounded,
                                  color: val ? Colors.pink : Colors.grey,
                                  size: 35,
                                ),
                              )
                            ]),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
