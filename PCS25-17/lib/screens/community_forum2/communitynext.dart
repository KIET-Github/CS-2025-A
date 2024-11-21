import 'package:flutter/material.dart';
import 'community_next.dart';

import 'list1.dart';

class Communitynext extends StatefulWidget {
  final indexes;

  const Communitynext({Key? key, required this.indexes}) : super(key: key);

  @override
  State<Communitynext> createState() => _CommunitynextState();
}

class _CommunitynextState extends State<Communitynext> {
  int i = 0;
  bool val = false;
  List<Community> list = List.from(forms.products);
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Material(
          color: Color.fromARGB(255, 244, 241, 241),
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                SizedBox(
                  height: 10,
                ),
                //1st
                InkWell(
                  onTap: (() => Navigator.of(context).pop()),
                  child: Material(
                    // color: Colors.white,
                    elevation: 5,
                    borderRadius: const BorderRadius.all(Radius.circular(15)),
                    child: Container(
                      margin: const EdgeInsets.fromLTRB(10, 20, 20, 20),
                      width: double.maxFinite,
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Image(
                              image: NetworkImage(
                                forms.products[widget.indexes].images,
                              ),
                              fit: BoxFit.contain),
                          const SizedBox(
                            height: 10,
                          ),
                          Padding(
                            padding: const EdgeInsets.all(2.0),
                            child: Column(
                              children: [
                                Container(
                                  width: 200,
                                  child: Text(
                                    forms.products[widget.indexes].ques,
                                    style: const TextStyle(
                                      color: Colors.black,
                                      height: 1.5,
                                      fontSize: 15,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                                SizedBox(
                                  height: 10,
                                ),
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  children: [
                                    Container(
                                      decoration: BoxDecoration(
                                        color: Color.fromRGBO(245, 245, 245, 1),
                                        borderRadius: BorderRadius.circular(25),
                                      ),
                                      child: Padding(
                                        padding: EdgeInsets.all(10.0),
                                        child: Align(
                                          alignment: Alignment.topLeft,
                                          child: Text(
                                            forms.products[widget.indexes].q1,
                                            style: TextStyle(
                                              fontSize: 10,
                                              color: Color.fromRGBO(
                                                  133, 142, 173, 1),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ),
                                    const SizedBox(
                                      width: 20,
                                    ),
                                    Container(
                                      decoration: BoxDecoration(
                                        color: const Color.fromRGBO(
                                            245, 245, 245, 1),
                                        borderRadius: BorderRadius.circular(25),
                                      ),
                                      child: Padding(
                                        padding: const EdgeInsets.all(10.0),
                                        child: Align(
                                          alignment: Alignment.center,
                                          child: Text(
                                            forms.products[widget.indexes].q2,
                                            style: const TextStyle(
                                              fontSize: 10,
                                              color: Color.fromRGBO(
                                                  133, 142, 173, 1),
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
                                      forms.products[widget.indexes].views,
                                      style: const TextStyle(
                                        color: Color.fromRGBO(151, 152, 157, 1),
                                        //fontWeight: FontWeight.bold,
                                        fontSize: 10,
                                      ),
                                    ),
                                    const SizedBox(
                                      width: 10,
                                    ),
                                    Text(
                                      forms.products[widget.indexes].likes,
                                      style: const TextStyle(
                                        color: Color.fromRGBO(151, 152, 157, 1),
                                        //fontWeight: FontWeight.bold,
                                        fontSize: 10,
                                      ),
                                    ),
                                    const SizedBox(
                                      width: 10,
                                    ),
                                    Text(
                                      forms.products[widget.indexes].ans,
                                      style: const TextStyle(
                                        color: Color.fromRGBO(151, 152, 157, 1),
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
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: [
                              Image(
                                image: NetworkImage(
                                    forms.products[widget.indexes].avatar),
                                fit: BoxFit.contain,
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                SizedBox(
                  height: 20,
                ),

                Container(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      "Comments and Replies",
                      style:
                          TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                    )),
                SizedBox(
                  height: 30,
                ),

                Expanded(
                  child: ListView.separated(
                      itemCount: 3,
                      separatorBuilder: (BuildContext context, int index) {
                        return SizedBox(
                          height: 25,
                        );
                      },
                      itemBuilder: ((context, index) {
                        return Material(
                          color: Colors.white,
                          elevation: 5,
                          borderRadius:
                              const BorderRadius.all(Radius.circular(15)),
                          child: Container(
                            color: Colors.white,
                            margin: const EdgeInsets.fromLTRB(10, 20, 20, 20),
                            width: double.maxFinite,
                            child: Column(
                              children: [
                                Row(
                                  children: [
                                    Image.network(form.product[index].images),
                                    SizedBox(
                                      width: 20,
                                    ),
                                    Container(
                                      alignment: Alignment.centerLeft,
                                      child: Text(
                                        form.product[index].name,
                                        style: TextStyle(
                                            color: Colors.red, fontSize: 15),
                                      ),
                                    ),
                                    const Spacer(),
                                    Container(
                                      alignment: Alignment.centerRight,
                                      child: Text(
                                        form.product[index].days,
                                        style: TextStyle(
                                            color: Colors.red, fontSize: 15),
                                      ),
                                    ),
                                  ],
                                ),
                                Text(
                                  form.product[index].text,
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 12,
                                  ),
                                ),
                                const SizedBox(
                                  height: 10,
                                ),
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.end,
                                  children: [
                                    IconButton(
                                      onPressed: (() {
                                        setState(() {
                                          val == true
                                              ? val = false
                                              : val = true;
                                        });
                                      }),
                                      icon: Icon(
                                        Icons.favorite_rounded,
                                        color: val ? Colors.pink : Colors.grey,
                                        size: 30,
                                      ),
                                    ),
                                    Container(
                                      alignment: Alignment.centerRight,
                                      child: const Text(
                                        "Love",
                                        style: TextStyle(
                                            color: Colors.red, fontSize: 15),
                                      ),
                                    ),
                                    SizedBox(
                                      width: 20,
                                    ),
                                    Icon(Icons.reply_all_outlined,
                                        size: 15, color: Colors.redAccent),
                                    Container(
                                      alignment: Alignment.centerRight,
                                      child: const Text(
                                        "Reply",
                                        style: TextStyle(
                                            color: Colors.red, fontSize: 15),
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        );
                      })),
                ),
              ],
            ),
          )),
    );
  }
}
