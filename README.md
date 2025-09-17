# gotogether


# GoTogether (Java, Firebase, Google Maps)

---

## Project overview

A complete Android (Java) student project implementing a carpool ride sharing app using Firebase Realtime Database / Authentication and Google Maps. This repository contains all essential Java source files, XML layouts, `AndroidManifest.xml`, and `build.gradle` snippets required to run the app locally in Android Studio.

> Important: Add your `google-services.json` file (Firebase) and enable Google Maps API in the Google Cloud Console. Replace `YOUR_GOOGLE_MAPS_API_KEY` in the manifest and `build.gradle` / resources where needed.

---

## Folder / file structure (provided in this document)

```
CarpoolApp/
├─ app/
│  ├─ src/main/java/com/example/carpool/
│  │  ├─ activities/
│  │  │  ├─ LoginActivity.java
│  │  │  ├─ RegisterActivity.java
│  │  │  ├─ MainActivity.java
│  │  │  ├─ OfferRideActivity.java
│  │  │  ├─ RideDetailsActivity.java
│  │  ├─ adapters/
│  │  │  ├─ RideAdapter.java
│  │  ├─ models/
│  │  │  ├─ Ride.java
│  │  │  ├─ User.java
│  │  └─ utils/
│  │     ├─ FirebaseUtils.java
│  ├─ src/main/res/layout/
│  │  ├─ activity_login.xml
│  │  ├─ activity_register.xml
│  │  ├─ activity_main.xml
│  │  ├─ activity_offer_ride.xml
│  │  ├─ item_ride.xml
│  │  ├─ activity_ride_details.xml
│  ├─ src/main/AndroidManifest.xml
│  └─ build.gradle (app)
└─ build.gradle (project)
```

---

## How to use this document

Each file below is presented as a code block. Copy the files into their respective locations in an Android Studio project. After copying:

1. Add `google-services.json` to `app/` (from your Firebase project).
2. Enable Firebase Authentication (Email/Password) and Realtime Database.
3. Enable Google Maps Android API and add the API key.
4. Sync and run in Android Studio.

---

## 1) app/build.gradle (module)

```gradle
apply plugin: 'com.android.application'
apply plugin: 'com.google.gms.google-services'

android {
    compileSdkVersion 33
    defaultConfig {
        applicationId "com.example.carpool"
        minSdkVersion 21
        targetSdkVersion 33
        versionCode 1
        versionName "1.0"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation 'com.google.firebase:firebase-auth:21.1.0'
    implementation 'com.google.firebase:firebase-database:20.1.0'
    implementation 'com.google.android.gms:play-services-maps:18.1.0'
    implementation 'com.google.android.gms:play-services-location:21.0.1'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.9.0'
    implementation 'androidx.recyclerview:recyclerview:1.3.0'
}
```

---

## 2) project-level build.gradle

```gradle
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.1.0'
        classpath 'com.google.gms:google-services:4.3.15'
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}
```

---

## 3) AndroidManifest.xml

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.carpool">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

    <application
        android:allowBackup="true"
        android:label="EcoRide"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AppCompat.Light.NoActionBar">

        <!-- Google Maps API key: replace with your key -->
        <meta-data
            android:name="com.google.android.geo.API_KEY"
            android:value="YOUR_GOOGLE_MAPS_API_KEY" />

        <activity android:name="com.example.carpool.activities.OfferRideActivity" />
        <activity android:name="com.example.carpool.activities.RideDetailsActivity" />
        <activity android:name="com.example.carpool.activities.MainActivity" />
        <activity android:name="com.example.carpool.activities.RegisterActivity" />
        <activity android:name="com.example.carpool.activities.LoginActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

---

## 4) Java source files

### 4.1) models/Ride.java

```java
package com.example.carpool.models;

public class Ride {
    private String rideId;
    private String driverId;
    private String fromLocation;
    private String toLocation;
    private String dateTime; // ISO string or simple text
    private int availableSeats;
    private double cost;

    public Ride() {}

    public Ride(String rideId, String driverId, String fromLocation, String toLocation,
                String dateTime, int availableSeats, double cost) {
        this.rideId = rideId;
        this.driverId = driverId;
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
        this.dateTime = dateTime;
        this.availableSeats = availableSeats;
        this.cost = cost;
    }

    // getters and setters
    public String getRideId() { return rideId; }
    public void setRideId(String rideId) { this.rideId = rideId; }
    public String getDriverId() { return driverId; }
    public void setDriverId(String driverId) { this.driverId = driverId; }
    public String getFromLocation() { return fromLocation; }
    public void setFromLocation(String fromLocation) { this.fromLocation = fromLocation; }
    public String getToLocation() { return toLocation; }
    public void setToLocation(String toLocation) { this.toLocation = toLocation; }
    public String getDateTime() { return dateTime; }
    public void setDateTime(String dateTime) { this.dateTime = dateTime; }
    public int getAvailableSeats() { return availableSeats; }
    public void setAvailableSeats(int availableSeats) { this.availableSeats = availableSeats; }
    public double getCost() { return cost; }
    public void setCost(double cost) { this.cost = cost; }
}
```

### 4.2) models/User.java

```java
package com.example.carpool.models;

public class User {
    private String uid;
    private String name;
    private String email;

    public User() {}

    public User(String uid, String name, String email) {
        this.uid = uid;
        this.name = name;
        this.email = email;
    }

    // getters and setters
    public String getUid() { return uid; }
    public void setUid(String uid) { this.uid = uid; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
```

### 4.3) utils/FirebaseUtils.java

```java
package com.example.carpool.utils;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

public class FirebaseUtils {
    public static FirebaseAuth getAuth(){
        return FirebaseAuth.getInstance();
    }

    public static DatabaseReference getRidesRef(){
        return FirebaseDatabase.getInstance().getReference("rides");
    }

    public static DatabaseReference getUsersRef(){
        return FirebaseDatabase.getInstance().getReference("users");
    }

    public static FirebaseUser getCurrentUser(){
        return getAuth().getCurrentUser();
    }
}
```

### 4.4) adapters/RideAdapter.java

```java
package com.example.carpool.adapters;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.carpool.R;
import com.example.carpool.activities.RideDetailsActivity;
import com.example.carpool.models.Ride;

import java.util.List;

public class RideAdapter extends RecyclerView.Adapter<RideAdapter.ViewHolder> {
    private Context context;
    private List<Ride> rides;

    public RideAdapter(Context context, List<Ride> rides){
        this.context = context;
        this.rides = rides;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_ride, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Ride ride = rides.get(position);
        holder.fromTv.setText(ride.getFromLocation());
        holder.toTv.setText(ride.getToLocation());
        holder.dateTv.setText(ride.getDateTime());
        holder.seatsTv.setText(String.valueOf(ride.getAvailableSeats()));
        holder.itemView.setOnClickListener(v -> {
            Intent intent = new Intent(context, RideDetailsActivity.class);
            intent.putExtra("rideId", ride.getRideId());
            context.startActivity(intent);
        });
    }

    @Override
    public int getItemCount() {
        return rides.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder{
        TextView fromTv, toTv, dateTv, seatsTv;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            fromTv = itemView.findViewById(R.id.tvFrom);
            toTv = itemView.findViewById(R.id.tvTo);
            dateTv = itemView.findViewById(R.id.tvDate);
            seatsTv = itemView.findViewById(R.id.tvSeats);
        }
    }
}
```

### 4.5) activities/LoginActivity.java

```java
package com.example.carpool.activities;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.example.carpool.R;
import com.example.carpool.utils.FirebaseUtils;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;

public class LoginActivity extends AppCompatActivity {

    private EditText emailEt, passEt;
    private Button loginBtn, goRegisterBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        emailEt = findViewById(R.id.etEmail);
        passEt = findViewById(R.id.etPass);
        loginBtn = findViewById(R.id.btnLogin);
        goRegisterBtn = findViewById(R.id.btnGoRegister);

        loginBtn.setOnClickListener(v -> {
            String email = emailEt.getText().toString().trim();
            String pass = passEt.getText().toString().trim();
            if(email.isEmpty() || pass.isEmpty()){
                Toast.makeText(this, "Enter email & password", Toast.LENGTH_SHORT).show();
                return;
            }
            FirebaseUtils.getAuth().signInWithEmailAndPassword(email, pass)
                .addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if(task.isSuccessful()){ 
                            startActivity(new Intent(LoginActivity.this, MainActivity.class));
                            finish();
                        } else {
                            Toast.makeText(LoginActivity.this, "Login failed: " + task.getException().getMessage(), Toast.LENGTH_SHORT).show();
                        }
                    }
                });
        });

        goRegisterBtn.setOnClickListener(v -> startActivity(new Intent(LoginActivity.this, RegisterActivity.class)));
    }
}
```

### 4.6) activities/RegisterActivity.java

```java
package com.example.carpool.activities;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.example.carpool.R;
import com.example.carpool.models.User;
import com.example.carpool.utils.FirebaseUtils;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;

public class RegisterActivity extends AppCompatActivity {

    private EditText nameEt, emailEt, passEt;
    private Button registerBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        nameEt = findViewById(R.id.etName);
        emailEt = findViewById(R.id.etEmail);
        passEt = findViewById(R.id.etPass);
        registerBtn = findViewById(R.id.btnRegister);

        registerBtn.setOnClickListener(v -> {
            String name = nameEt.getText().toString().trim();
            String email = emailEt.getText().toString().trim();
            String pass = passEt.getText().toString().trim();
            if(name.isEmpty() || email.isEmpty() || pass.isEmpty()){
                Toast.makeText(this, "All fields required", Toast.LENGTH_SHORT).show();
                return;
            }
            FirebaseUtils.getAuth().createUserWithEmailAndPassword(email, pass)
                .addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if(task.isSuccessful()){
                            FirebaseUser firebaseUser = FirebaseUtils.getCurrentUser();
                            User user = new User(firebaseUser.getUid(), name, email);
                            DatabaseReference usersRef = FirebaseUtils.getUsersRef();
                            usersRef.child(firebaseUser.getUid()).setValue(user);
                            startActivity(new Intent(RegisterActivity.this, MainActivity.class));
                            finish();
                        } else {
                            Toast.makeText(RegisterActivity.this, "Register failed: " + task.getException().getMessage(), Toast.LENGTH_SHORT).show();
                        }
                    }
                });
        });
    }
}
```

### 4.7) activities/OfferRideActivity.java

```java
package com.example.carpool.activities;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.carpool.R;
import com.example.carpool.models.Ride;
import com.example.carpool.utils.FirebaseUtils;
import com.google.firebase.database.DatabaseReference;
```
