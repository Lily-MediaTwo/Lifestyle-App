# 🏋️ Enhanced 4-Week Fat Loss Tracker

A comprehensive, nature-themed fitness tracker designed for serious fat loss and strength building. Features intelligent day-switching, adaptive workout metrics, and beautiful progress visualization.

## ✨ Key Features

### 📅 **Smart Day Management**
- **Day-specific data**: Switch between any day to view/edit that day's progress
- **Auto-reset**: Water and protein automatically reset each new day
- **Persistent history**: All previous day data preserved for weekly averages

### 🏋️ **Adaptive Workout Tracking**
- **Strength Days** (Mon/Wed/Fri): Weight tracking in pounds with PR detection
- **HIIT Days** (Tue/Thu): Time duration tracking in minutes
- **Core Exercises**: Rep count tracking for volume progression
- **Recovery Days** (Sat/Sun): Simple completion checkboxes

### 📊 **Comprehensive Progress Tracking**
- **Personal Records**: Automatic PR detection and celebration for strength exercises
- **Visual Charts**: Weight and waist measurement trends
- **Weekly Averages**: Protein, water, sleep, and workout completion rates
- **Streak Counter**: Daily consistency motivation with visual indicators

### 🥤 **Advanced Nutrition Monitoring**
- **Protein Goal Ring**: Visual progress circle with customizable daily targets
- **Quick-Add Buttons**: Fast protein logging (20g, 25g, 30g, 40g increments)
- **Water Tracking**: Interactive drop visualization with progress bar
- **Daily Targets**: Separate goals and tracking for each day

### 📱 **Premium User Experience**
- **PWA Ready**: Install as mobile app with offline functionality
- **Dark/Light Mode**: Automatic theme switching based on system preference
- **Smooth Animations**: Premium micro-interactions and success feedback
- **Responsive Design**: Optimized for mobile, tablet, and desktop

## 🗓️ **Weekly Schedule Overview**

| Day | Training | Sermorelin | Cardio | Nutrition Focus |
|-----|----------|------------|---------|-----------------|
| **Mon** 🏋 | Full Body Strength | ✔ | — | Mod carbs post-workout |
| **Tue** ⚡ | HIIT + Core | ✔ | — | Low carb PM |
| **Wed** 🏋 | Upper Strength + Cardio | ✔ | 20 min steady | Mod carbs post-workout |
| **Thu** ⚡ | HIIT | ✔ | — | Low carb PM |
| **Fri** 🏋 | Lower Strength + Cardio | ✔ | 20–30 min steady | Mod carbs post-workout |
| **Sat** 🚶 | Active Recovery | ❌ | Fasted walk | Low carb day |
| **Sun** ❌ | Rest | ❌ | Light walk optional | Low carb day |

## 🚀 **Getting Started**

### Quick Setup
1. **Download**: Save the `index.html` file
2. **Open**: Double-click to open in your browser
3. **Install** (optional): Use browser's "Install App" option for PWA experience

### Local Server (Recommended)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx serve .

# Then visit: http://localhost:8000
```

### First Use
1. **Set Protein Goal**: Tap the protein ring to set your daily target (typically 120-180g)
2. **Start Today**: Begin checking off tasks and logging water/protein
3. **Log Workouts**: Select exercises and enter appropriate metrics for each workout type
4. **Weekly Metrics**: Log body measurements on Sunday mornings for progress tracking

## 📊 **Data Management**

### Export/Import
- **Export**: Creates JSON backup of all your data (schedule, checks, logs, PRs)
- **Import**: Restores complete app state from backup file
- **Migration**: Automatically upgrades from older versions

### Storage
- Uses browser localStorage for persistent data
- No server required - everything stays on your device
- Weekly averages calculated from daily logs
- PR tracking preserved across all workout sessions

## 🎯 **Workout Metrics Guide**

- **💪 Strength Training**: Track weight in pounds for progressive overload
- **⚡ HIIT/Cardio**: Track time duration for intensity management  
- **🔥 Core Work**: Track total reps for volume progression
- **🧘 Recovery**: Simple completion tracking for rest days

## 🏆 **Progress Features**

- **Personal Records**: Automatic detection and display of strength PRs
- **Body Metrics**: Weekly weight and waist measurement trends
- **Weekly Summary**: Average protein, water, sleep, and workout completion
- **Achievement System**: Streak counters and celebration feedback

## 💾 **Browser Compatibility**

- **Modern browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **PWA Support**: Install on iOS/Android home screen
- **Offline Ready**: Basic functionality works without internet
- **Responsive**: Optimized for phones, tablets, and desktop

## 🔧 **Technical Notes**

- **Self-contained**: Single HTML file with embedded CSS/JS
- **No dependencies**: Works without external libraries or CDN
- **Privacy-focused**: All data stays on your device
- **Version**: Currently v24 with automatic migration from older versions

---

**Built for serious fitness enthusiasts who want comprehensive tracking without complexity.**
