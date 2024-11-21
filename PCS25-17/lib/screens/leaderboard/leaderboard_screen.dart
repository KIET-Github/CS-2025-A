// ignore_for_file: prefer_interpolation_to_compose_strings

import 'dart:math';

import 'package:easy_separator/easy_separator.dart';
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:get/get.dart';
import 'package:sih_2022/controllers/controllers.dart';
import 'package:sih_2022/firebase/firebase_configs.dart';
import 'package:sih_2022/models/models.dart';
import 'package:sih_2022/widgets/widgets.dart';

class LeaderBoardScreen extends GetView<LeaderBoardController> {
  LeaderBoardScreen({Key? key}) : super(key: key) {
    SchedulerBinding.instance.addPostFrameCallback((d) {
      final paper = Get.arguments as QuizPaperModel;
      controller.getAll(paper.id);
      controller.getMyScores(paper.id);
    });
  }

  static const String routeName = '/leaderboard';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.white,
        automaticallyImplyLeading: false,
        title: Center(
          child: Text(
            "Rankings",
            style: TextStyle(
                color: Colors.black, fontWeight: FontWeight.bold, fontSize: 28),
          ),
        ),
      ),
      backgroundColor: Colors.white,
      extendBodyBehindAppBar: true,
      bottomNavigationBar: Obx(() => controller.myScores.value == null
          ? const SizedBox()
          : LeaderBoardCard(
              data: controller.myScores.value!,
              index: -1,
              colorw: Colors.redAccent,
            )),
      body: Center(
        child: Obx(
          () => controller.loadingStatus.value == LoadingStatus.loading
              ? const ContentArea(
                  addPadding: true,
                  child: CircularProgressIndicator(),
                )
              : ContentArea(
                  addPadding: false,
                  child: ListView.separated(
                    itemCount: controller.leaderBoard.length,
                    separatorBuilder: (BuildContext context, int index) {
                      return SizedBox(
                        height: 4,
                      );
                    },
                    itemBuilder: (BuildContext context, int index) {
                      final data = controller.leaderBoard[index];

                      return Padding(
                        padding: const EdgeInsets.fromLTRB(20, 0, 20, 0),
                        child: Column(
                          children: [
                            index == 0
                                ? SizedBox(
                                    height: 20,
                                  )
                                : SizedBox(),
                            index == 0
                                ? LeaderBoardCard(
                                    data: data,
                                    index: index,
                                    colorw: Colors.yellow,
                                  )
                                : index == 1
                                    ? LeaderBoardCard(
                                        data: data,
                                        index: index,
                                        colorw: Colors.grey,
                                      )
                                    : index == 2
                                        ? LeaderBoardCard(
                                            data: data,
                                            index: index,
                                            colorw:
                                                Colors.brown.withOpacity(0.8),
                                          )
                                        : LeaderBoardCard(
                                            data: data,
                                            index: index,
                                            colorw: Colors.red.withOpacity(0.4),
                                          ),
                          ],
                        ),
                      );
                    },
                  ),
                ),
        ),
      ),
    );
  }
}

class LeaderBoardCard extends StatelessWidget {
  LeaderBoardCard({
    Key? key,
    required this.data,
    required this.index,
    required this.colorw,
  }) : super(key: key);

  final LeaderBoardData data;
  final int index;
  final Color colorw;
  // Colors.primaries[Random().nextInt(Colors.primaries.length)]
  // .withOpacity(0.5);

  @override
  Widget build(BuildContext context) {
    const tsStyle = TextStyle(fontWeight: FontWeight.bold);
    return Container(
      // color: Colors.white,

      height: 100,
      decoration:
          BoxDecoration(color: colorw, borderRadius: BorderRadius.circular(20)),
      child: ListTile(
        leading: CircleAvatar(
          foregroundImage:
              data.user.image == null ? null : NetworkImage(data.user.image!),
        ),
        title: Text(
          data.user.name,
          style: tsStyle,
        ),
        subtitle: EasySeparatedRow(
          crossAxisAlignment: CrossAxisAlignment.center,
          separatorBuilder: (BuildContext context, int index) {
            return const SizedBox(
              width: 12,
            );
          },
          children: [
            IconWithText(
              icon: Icon(
                Icons.done_all,
                color: Theme.of(context).primaryColor,
              ),
              text: Text(
                data.correctCount!,
                style: tsStyle,
              ),
            ),
            IconWithText(
              icon: Icon(
                Icons.timer,
                color: Theme.of(context).primaryColor,
              ),
              text: Text(
                '${data.time!}',
                style: tsStyle,
              ),
            ),
            IconWithText(
              icon: Icon(
                Icons.emoji_events_outlined,
                color: Theme.of(context).primaryColor,
              ),
              text: Text(
                '${data.points!}',
                style: tsStyle,
              ),
            ),
          ],
        ),
        trailing: Text(
          '#' + '${index + 1}'.padLeft(2, "0"),
          style: tsStyle,
        ),
      ),
    );
  }
}
