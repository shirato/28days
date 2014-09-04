package com.sdd.TwentyEightDays;

import org.apache.cordova.*;

import android.os.Bundle;
import android.app.Activity;
import android.content.Context;
import android.view.Menu;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class MainActivity extends DroidGap {

	@Override
	public void onCreate(Bundle savedInstanceState) {

		super.onCreate(savedInstanceState);
		super.loadUrl("file:///android_asset/www/index.html");
		
/*		Activity activity;
		WebView webView;
		
		String databasePath = activity.getApplicationContext().getDir("localstorage", Context.MODE_PRIVATE).getPath();
		WebSettings settings = webView.getSettings();
		settings.setDomStorageEnabled(true);
		settings.setDatabasePath(databasePath);
		
		//Save
		webView.loadUrl("javascript:window.localStorage.setItem('key', 'value');");
		
		//Read
		webView.loadUrl("javascript:android.getItem(window.localStorage.getItem('key'));");
		
		//Interface
		public class JavascriptInterface{
			public void getItem(String key, String val){
				//
			}
		}*/
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

}
