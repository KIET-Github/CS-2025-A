import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:liquid_pull_to_refresh/liquid_pull_to_refresh.dart';
import 'package:sih_2022/configs/configs.dart';
import 'package:sih_2022/widgets/common/content_area.dart';

import '../../controllers/quiz_paper/quiz_papers_controller.dart';
// import '../../models/quiz_paper_model.dart';
import '../../widgets/home/leaderboard_model.dart';

import 'home.dart';

class LeaderBoardPage extends StatefulWidget {
  LeaderBoardPage({
    Key? key,
  }) : super(key: key);

  @override
  State<LeaderBoardPage> createState() => _LeaderBoardPageState();
}

class _LeaderBoardPageState extends State<LeaderBoardPage> {
  QuizPaperController _quizePprContoller = Get.find();
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    QuizPaperController _quizePprContoller = Get.find();
    return WillPopScope(
      onWillPop: () async {
        Get.offAllNamed(HomeScreen1.routeName);
        return Future.delayed(Duration(microseconds: 0));
      },
      child: Container(
        decoration: BoxDecoration(
            image: DecorationImage(
                fit: BoxFit.cover,
                image: AssetImage('assets/images/gamepage2.png'))),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: LiquidPullToRefresh(
                height: 150,
                springAnimationDurationInMilliseconds: 500,
                color: Colors.red[100],
                onRefresh: () async {
                  _quizePprContoller.getAllPapers();
                },
                child: ContentArea(
                  addPadding: false,
                  child: Obx(
                    () => ListView.separated(
                      padding: UIParameters.screenPadding,
                      shrinkWrap: true,
                      itemCount: _quizePprContoller.allPapers.length,
                      itemBuilder: (BuildContext context, int index) {
                        return LeaderBoardCard(
                          model: _quizePprContoller.allPapers[index],
                        );
                      },
                      separatorBuilder: (BuildContext context, int index) {
                        return const SizedBox(height: 20);
                      },
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
