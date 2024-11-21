// ignore_for_file: no_leading_underscores_for_local_identifiers, prefer_interpolation_to_compose_strings

import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sih_2022/controllers/auth_controller.dart';
import 'package:sih_2022/firebase/firebase_configs.dart';
import 'package:sih_2022/models/models.dart';
import 'package:sih_2022/screens/child/home.dart';
import 'package:sih_2022/screens/screens.dart';
import 'package:sih_2022/utils/logger.dart';
import 'package:sih_2022/widgets/dialogs/dialogs.dart';

import 'quiz_papers_controller.dart';

class QuizController extends GetxController {
  final loadingStatus = LoadingStatus.loading.obs;
  final allQuestions = <Question>[];
  late QuizPaperModel quizPaperModel;
  Timer? _timer;
  int remainSeconds = 1;
  final time = '00:00'.obs;
  int count = 0;
  late SharedPreferences _prefs;
  saveStringValue(int name) async {
    _prefs = await SharedPreferences.getInstance();
    _prefs.setInt('count', name);
    print(count);
  }

  retrieveStringValue() async {
    _prefs = await SharedPreferences.getInstance();

    int? value;
    if (_prefs.getInt("count") == null) {
      count = 0;
    } else {
      _prefs.getInt("count") as int;
    }

    if (value == null) {
      count = 0;
    } else {
      count = value;
    }

    await Future.delayed(Duration(seconds: 1));
  }

  @override
  void onReady() {
    final _quizePaprer = Get.arguments as QuizPaperModel;
    retrieveStringValue();
    loadData(_quizePaprer);
    super.onReady();
  }

  @override
  void onClose() {
    if (_timer != null) {
      _timer!.cancel();
    }
    super.onClose();
  }

  Future<bool> onExitOfQuiz() async {
    return Dialogs.quizEndDialog();
  }

  void _startTimer(int seconds) {
    const duration = Duration(seconds: 1);
    remainSeconds = seconds;
    _timer = Timer.periodic(
      duration,
      (Timer timer) {
        if (remainSeconds == 0) {
          timer.cancel();
        } else {
          int minutes = remainSeconds ~/ 60;
          int seconds = (remainSeconds % 60);
          time.value = minutes.toString().padLeft(2, "0") +
              ":" +
              seconds.toString().padLeft(2, "0");
          remainSeconds--;
        }
      },
    );
  }

  void loadData(QuizPaperModel quizPaper) async {
    quizPaperModel = quizPaper;
    loadingStatus.value = LoadingStatus.loading;
    try {
      final QuerySnapshot<Map<String, dynamic>> questionsQuery =
          await quizePaperFR.doc(quizPaper.id).collection('questions').get();
      final questions = questionsQuery.docs
          .map((question) => Question.fromSnapshot(question))
          .toList();
      quizPaper.questions = questions;
      // print(questions);

      for (Question _question in quizPaper.questions!) {
        final QuerySnapshot<Map<String, dynamic>> answersQuery =
            await quizePaperFR
                .doc(quizPaper.id)
                .collection('questions')
                .doc(_question.id)
                .collection('answers')
                .get();
        final answers = answersQuery.docs
            .map((answer) => Answer.fromSnapshot(answer))
            .toList();
        _question.answers = answers;
      }
    } on Exception catch (e) {
      RegExp exp = RegExp(
        r'permission-denied',
        caseSensitive: false,
      );
      if (e.toString().contains(exp)) {
        AuthController _authController = Get.find();
        Get.back();
        _authController.showLoginAlertDialog();
      }
      AppLogger.e(e);
      loadingStatus.value = LoadingStatus.error;
    } catch (e) {
      loadingStatus.value = LoadingStatus.error;
      AppLogger.e(e);
    }

    if (quizPaper.questions != null && quizPaper.questions!.isNotEmpty) {
      allQuestions.assignAll(quizPaper.questions!);
      currentQuestion.value = quizPaper.questions![0];
      _startTimer(quizPaper.timeSeconds);
      loadingStatus.value = LoadingStatus.completed;
    } else {
      loadingStatus.value = LoadingStatus.noReult;
    }
  }

  Rxn<Question> currentQuestion = Rxn<Question>();
  final questionIndex = 0.obs; //_curruntQuestionIndex

  bool get isFirstQuestion => questionIndex.value > count;

  bool get islastQuestion => questionIndex.value >= allQuestions.length - 1;

  void nextQuestion() {
    if (questionIndex.value >= allQuestions.length - 1) return;
    questionIndex.value++;
    currentQuestion.value = allQuestions[questionIndex.value];
  }

  void prevQuestion() {
    if (questionIndex.value <= 0) {
      return;
    }
    questionIndex.value--;
    currentQuestion.value = allQuestions[questionIndex.value];
  }

  void jumpToQuestion(int index, {bool isGoBack = true}) {
    questionIndex.value = index;
    currentQuestion.value = allQuestions[index];
    if (isGoBack) {
      Get.back();
    }
  }

  void selectAnswer(String? answer) {
    currentQuestion.value!.selectedAnswer = answer;
    update(['answers_list', 'answers_review_list']);
  }

  String get completedQuiz {
    final answeredQuestionCount = allQuestions
        .where((question) => question.selectedAnswer != null)
        .toList()
        .length;
    return '$answeredQuestionCount out of ${allQuestions.length} answered';
  }

  void complete() {
    _timer!.cancel();
    saveStringValue(5);
    Get.offAndToNamed(Resultcreen.routeName);
  }

  void tryAgain() {
    Get.find<QuizPaperController>()
        .navigatoQuestions(paper: quizPaperModel, isTryAgain: true);
  }

  void navigateToHome() {
    _timer!.cancel();
    Get.offNamedUntil(HomeScreen1.routeName, (route) => false);
  }

  void navigateToHome1() {
    _timer!.cancel();
    Get.offNamedUntil(HomeScreen1.routeName, (route) => false);
  }
}
