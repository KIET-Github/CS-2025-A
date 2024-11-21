// ignore_for_file: prefer_const_constructors

import 'package:get/get.dart';
import 'package:sih_2022/controllers/controllers.dart';
import 'package:sih_2022/screens/auth_and_profile/singin_page.dart';
import 'package:sih_2022/screens/child/home.dart';
// import 'package:sih_2022/screens/home/article_screen.dart/article_page.dart';
import 'package:sih_2022/screens/home/story_screen.dart';
import 'package:sih_2022/screens/screens.dart';
import 'package:sih_2022/screens/splash/splash.dart';
import 'package:sih_2022/screens/timeline/timeline.dart';

class AppRoutes {
  static List<GetPage> pages() => [
        GetPage(
          page: () => const SplashScreen(),
          name: SplashScreen.routeName,
        ),
        // GetPage(
        // page: () => const AppIntroductionScreen(),
        // name: AppIntroductionScreen.routeName,
        // ),
        GetPage(
            page: () => HomeScreen(),
            name: HomeScreen.routeName,
            transition: Transition.rightToLeftWithFade,
            transitionDuration: Duration(milliseconds: 10),
            binding: BindingsBuilder(() {
              Get.put(QuizPaperController());
            })),
        GetPage(
            page: () => HomeScreen1(),
            name: HomeScreen1.routeName,
            transition: Transition.rightToLeftWithFade,
            transitionDuration: Duration(milliseconds: 10),
            binding: BindingsBuilder(() {
              Get.put(QuizPaperController());
            })),
        GetPage(
          page: () => LoginScreen(),
          name: LoginScreen.routeName,
          transitionDuration: Duration(microseconds: 10),
          transition: Transition.leftToRight,
        ),
        GetPage(
            page: () => ProfileScreen(),
            name: ProfileScreen.routeName,
            binding: BindingsBuilder(() {
              Get.put(QuizPaperController());
              Get.put(ProfileController());
            })),
        GetPage(
            page: () => LeaderBoardScreen(),
            name: LeaderBoardScreen.routeName,
            binding: BindingsBuilder(() {
              Get.put(LeaderBoardController());
            })),
        GetPage(
            page: () => QuizeScreen(),
            transition: Transition.leftToRight,
            name: QuizeScreen.routeName,
            binding: BindingsBuilder(() {
              Get.put<QuizController>(QuizController());
            })),
        GetPage(
            page: () => const AnswersCheckScreen(),
            name: AnswersCheckScreen.routeName),
        GetPage(
            page: () => const QuizOverviewScreen(),
            name: QuizOverviewScreen.routeName),
        GetPage(page: () => const Resultcreen(), name: Resultcreen.routeName),
        GetPage(page: () => SigninPage(), name: SigninPage.routeName),
        // GetPage(page: () => ArticlePage(), name: A.routeName),
        // GetPage(page: () => ArticlePage2(), name: ArticlePage2.routeName),
        GetPage(page: () => StoryPage(), name: StoryPage.routeName),
        GetPage(page: () => TimeLinePage(), name: TimeLinePage.routeName),
      ];
}
