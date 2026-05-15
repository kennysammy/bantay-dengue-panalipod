import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'screens/cleanup_tasks_screen.dart';
import 'screens/daily_tips_screen.dart';
import 'screens/risk_checker_screen.dart';
import 'screens/risk_forecast_screen.dart';
import 'screens/symptom_tracker_screen.dart';

void main() {
  runApp(const ProviderScope(child: BantayDengueApp()));
}

class BantayDengueApp extends StatelessWidget {
  const BantayDengueApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Bantay-Dengue',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),
        useMaterial3: true,
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;

  final _screens = const [
    RiskCheckerScreen(),
    SymptomTrackerScreen(),
    CleanupTasksScreen(),
    DailyTipsScreen(),
    RiskForecastScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Bantay-Dengue Mobile')),
      body: _screens[_selectedIndex],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (value) => setState(() => _selectedIndex = value),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.analytics_outlined), label: 'Risk'),
          NavigationDestination(icon: Icon(Icons.health_and_safety_outlined), label: 'Symptoms'),
          NavigationDestination(icon: Icon(Icons.cleaning_services_outlined), label: 'Cleanup'),
          NavigationDestination(icon: Icon(Icons.lightbulb_outline), label: 'Tips'),
          NavigationDestination(icon: Icon(Icons.auto_graph_outlined), label: 'Forecast'),
        ],
      ),
    );
  }
}
