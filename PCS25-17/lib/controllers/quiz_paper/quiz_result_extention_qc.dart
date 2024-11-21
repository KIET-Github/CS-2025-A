// ignore_for_file: no_leading_underscores_for_local_identifiers

import 'dart:convert';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';
import 'package:sih_2022/controllers/controllers.dart';
import 'package:sih_2022/firebase/references.dart';
import 'package:sih_2022/services/notification/notification_service.dart';
import 'package:uuid/uuid.dart';
import 'package:uuid/uuid_util.dart';

var uuid = Uuid(options: {'grng': UuidUtil.cryptoRNG});

// Generate a v4 (random) id that will use cryptRNG for its rng function

extension QuizeResult on QuizController {
  int get correctQuestionCount => allQuestions
      .where((question) => question.selectedAnswer == question.correctAnswer)
      .toList()
      .length;

  String get correctAnsweredQuestions {
    return '$correctQuestionCount out of ${allQuestions.length} are correct';
  }

  double get points {
    var points = (correctQuestionCount / allQuestions.length) *
        10000 /
        (quizPaperModel.timeSeconds - remainSeconds);
    return points.toPrecision(2);
  }

  Future<void> saveQuizResults() async {
    var batch = fi.batch();
    User? _user = Get.find<AuthController>().getUser();
    if (_user == null) return;
    batch.set(
      userFR
          .doc(_user.email)
          .collection('myrecent_quizes')
          .doc(quizPaperModel.id + uuid.v4()),
      {
        "points": points,
        "correct_count": '$correctQuestionCount/${allQuestions.length}',
        "paper_id": quizPaperModel.id,
        'saved_date': double.parse(DateTime.now().day.toString()).toDouble(),
        "time": (quizPaperModel.timeSeconds - remainSeconds).toDouble()
      },
    );
    batch.set(
        leaderBoardFR
            .doc(quizPaperModel.id)
            .collection('scores')
            .doc(_user.email),
        {
          "points": points,
          "correct_count": '$correctQuestionCount/${allQuestions.length}',
          "paper_id": quizPaperModel.id,
          "user_id": _user.email,
          "time": quizPaperModel.timeSeconds - remainSeconds
        });
    await batch.commit();
    Get.find<NotificationService>().showQuizCompletedNotification(
        id: 1,
        title: quizPaperModel.title,
        body:
            'You have just got $points points for ${quizPaperModel.title} -  Tap here to view leaderboard',
        imageUrl: quizPaperModel.imageUrl,
        payload: json.encode(quizPaperModel.toJson()));
    navigateToHome1();
  }
}
