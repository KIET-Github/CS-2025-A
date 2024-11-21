import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get/get.dart';
import 'package:hive/hive.dart';
import 'package:hive_flutter/adapters.dart';
import 'package:sih_2022/screens/games/2048/models/board_adapter.dart';
import 'bindings/initial_binding.dart';
import 'firebase_options.dart';
import 'routes/app_routes.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initFireBase();
  InitialBinding().dependencies();
  await Hive.initFlutter();
  Hive.registerAdapter(BoardAdapter());

  SystemChrome.setPreferredOrientations(
      [DeviceOrientation.portraitUp, DeviceOrientation.portraitDown]).then((_) {
    runApp(const MyApp());
  });
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  static final GlobalKey<NavigatorState> navigatorKey = GlobalKey();

  @override
  Widget build(BuildContext context) {
    return ProviderScope(
      child: GetMaterialApp(
        theme: ThemeData(fontFamily: 'Nunito'),
        navigatorKey: navigatorKey,
        title: 'Vriddhi',
        getPages: AppRoutes.pages(),
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}

Future<void> initFireBase() async {
  await Firebase.initializeApp(
    name: 'sih_2022-demo',
    options: DefaultFirebaseOptions.currentPlatform,
  );
}

// void main(List<String> args) async {
//   WidgetsFlutterBinding.ensureInitialized();
//   await initFireBase();
//   runApp(GetMaterialApp(
//     home: DataUploaderScreen(),
//   ));
// }
