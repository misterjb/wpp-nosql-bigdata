package com.nosql;

import org.json.JSONObject;
import redis.clients.jedis.Jedis;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

public class Redis {
    private static Jedis jedis;

    public static void main(String[] args) throws IOException {
        jedis = new Jedis("localhost", 6379);
        System.out.println(jedis.ping());

        importJson(); // 4a
        System.out.println(getValue("01001")); //4b
        System.out.println(findKey("TUMTUM")); //4c
        System.out.println(findKey("HAMBURG")); //4c
    }

    public static void importJson() throws IOException {
        FileReader freader = new FileReader("./res/plz.data");
        BufferedReader breader = new BufferedReader(freader);
        String dataline = breader.readLine();

        while (dataline != null) {
            JSONObject jsonObject = new JSONObject(dataline);
            String key = (String) jsonObject.get("_id");
            jsonObject.remove(key);
            String value = jsonObject.toString();
            jedis.set(key, value);
            dataline = breader.readLine();
        }
        breader.close();
    }


    public static String getValue(String key) {
        String value = jedis.get(key);
        if (value != "") {
            JSONObject jsonObject = new JSONObject(value);
            String city = jsonObject.get("city").toString();
            String state = jsonObject.get("state").toString();

            return "City > " + city + "and State > " + state;
        }
        return "Keine zutreffende Eingabe!";
    }

    public static String findKey(String city) {
        Set<String> keys = jedis.keys("*");
        List<String> answer = new ArrayList<String>();

        for (String key : keys) {
            String value = jedis.get(key);
            JSONObject jsonObject = new JSONObject(value);
            if (city.equals(jsonObject.get("city").toString())) {
                answer.add(key);
            }
        }

        Collections.sort(answer);

        if (answer.isEmpty()) {
            return "Keine zutreffende Eingabe!";
        }
        return answer.toString();
    }
}