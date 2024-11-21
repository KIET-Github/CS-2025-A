// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:flutter/material.dart';
// ignore: implementation_imports, unnecessary_import
import 'package:flutter/src/widgets/framework.dart';
import 'package:sih_2022/screens/community_forum2/specially_class.dart';

class DetailScreen extends StatelessWidget {
  final Item item;

  const DetailScreen({
    Key? key,
    required this.item,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.0,
        iconTheme: const IconThemeData(
          color: Colors.black,
        ),
        title: const Center(
          child: Text(
            "Schools near you",
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.black,
            ),
          ),
        ),
      ),
      body: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
              Text(
                item.schoolname,
                style: const TextStyle(
                  color: Colors.red,
                  fontSize: 24,
                ),
              ),
              // Row(
              //   children: [
              //     const Text("School  Name:",
              //     style: TextStyle(
              //       color:Colors.red,
              //       fontSize: 24,
              //     ),),
              //     Text(item.schoolname),
              //   ],
              // ),
              // Row(
              //   children:  [
              //     const Text("School"),
              //     Text(""),
              //   ],
              // ),

              const SizedBox(
                height: 20,
              ),
              Image.network(
                item.image,
                fit: BoxFit.fill,
                scale: 1.5,
                alignment: AlignmentDirectional.center,
              ),
              const SizedBox(
                height: 10,
              ),

              Row(
                children: [
                  const Text(
                    "Contact Info:",
                    style: TextStyle(
                      color: Colors.red,
                    ),
                  ),
                  Text(item.contact, softWrap: true),
                ],
              ),
              Row(
                children: [
                  const Text(
                    "Email-Id:",
                    style: TextStyle(
                      color: Colors.red,
                    ),
                  ),
                  Text(item.email),
                ],
              ),
              Row(
                children: [
                  const Text(
                    "About:",
                    style: TextStyle(
                      color: Colors.red,
                    ),
                  ),
                  Text(item.speciality),
                ],
              ),
              Row(
                children: [
                  const Text(
                    "Location:",
                    style: TextStyle(
                      color: Colors.red,
                    ),
                  ),
                  Text(item.location),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
