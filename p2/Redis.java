package nosql;

import java.awt.BorderLayout;
import java.awt.EventQueue;
import java.awt.TextArea;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.border.EmptyBorder;

import org.json.JSONException;
import org.json.JSONObject;

import redis.clients.jedis.Jedis;

import javax.swing.JTextField;
import javax.swing.JTextPane;
import javax.swing.JLabel;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.awt.event.ActionEvent;
import javax.swing.JButton;

public class Redis extends JFrame {

	private JPanel contentPane;
	private JTextField txtPlz;
	private JTextField textField_1;
	private JTextArea textArea;
	
	private static Jedis jedis;
	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		jedis = new Jedis("localhost", 6379);
		EventQueue.invokeLater(new Runnable() {
			
			public void run() {
				try {
					Redis frame = new Redis();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the frame.
	 * @throws JSONException 
	 */
	public Redis() throws IOException, JSONException {
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 700, 400);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(null);
		
		txtPlz = new JTextField();
		txtPlz.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				try {
					textArea.append(getValue(txtPlz.getText())+"\n");
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		});
		txtPlz.setBounds(98, 11, 133, 20);
		contentPane.add(txtPlz);
		txtPlz.setColumns(10);
		
		textField_1 = new JTextField();
		textField_1.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				try {
					textArea.append(findKey(textField_1.getText())+"\n");
				} catch (JSONException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				
			}
		});
		textField_1.setBounds(98, 42, 133, 20);
		contentPane.add(textField_1);
		textField_1.setColumns(10);
		
		JLabel lblPlz = new JLabel("PLZ");
		lblPlz.setBounds(10, 14, 66, 14);
		contentPane.add(lblPlz);
		
		JLabel lblStadt = new JLabel("Stadt");
		lblStadt.setBounds(10, 45, 66, 14);
		contentPane.add(lblStadt);
		
		JButton btnAufgabe = new JButton("Aufgabe 4");
		btnAufgabe.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				try {
					textArea.append("\n"+getValue("01001")+"\n");
				} catch (JSONException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				try {
					textArea.append("\n"+findKey("TUMTUM")+"\n");
				} catch (JSONException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				try {
					textArea.append("\n"+findKey("HAMBURG")+"\n");
				} catch (JSONException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}
		});
		btnAufgabe.setBounds(95, 74, 136, 23);
		contentPane.add(btnAufgabe);
		
		textArea = new JTextArea();
		textArea.setLineWrap(true);
		textArea.setBounds(241, 9, 433, 297);
		textArea.setWrapStyleWord(true);
		contentPane.add(textArea);
		textArea.append(jedis.ping()+"\n");
		importJson();
	}
	public static void importJson() throws IOException, JSONException {
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

	public static String getValue(String key) throws JSONException {
		String value = jedis.get(key);
		if (value != "") {
			JSONObject jsonObject = new JSONObject(value);
			String city = jsonObject.get("city").toString();
			String state = jsonObject.get("state").toString();

			return "City > " + city + " and State > " + state;
		}
		return "Keine zutreffende Eingabe!";
	}

	public static String findKey(String city) throws JSONException {
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
