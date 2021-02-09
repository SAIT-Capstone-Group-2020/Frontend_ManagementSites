import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;

public class FileManager {

    public String fileName;
    // public ArrayList<Item> items;

    public FileManager(String fileName) {
        this.fileName = fileName;
    }

    // ArrayList<Item>
    public void readFile() throws IOException {

        BufferedReader fileData = new BufferedReader(new FileReader(this.fileName));
        System.out.println(fileData.readLine());

        // change this for loop to a while loop, ending at end of file
        for (int i = 0; i < 10; i++) {

            String fileLine = fileData.readLine();

            String[] itemParts = fileLine.split(",");

            String productId = itemParts[0];
            String productName = itemParts[1];
            double price = Double.parseDouble(itemParts[2]);
            String category = itemParts[3];
            int quantity = Integer.parseInt(itemParts[4]);
            double weight = Double.parseDouble(itemParts[5]);
            String weightType = itemParts[6];
            // add "Brand" to CSV file
            String brand = itemParts[7];

            // This line is used to print the line to the console, to test if it's read properly
            /*
             * System.out.printf("%s %10s %10f %10s %10d %10f %10s %10s %n", productId,
             * productName, price, category, quantity, weight, weightType, brand);
             */

            // This line is used to create a new object when the backend connection is made
            /*
             * Item newItem = new Item(productId, productName, price, category, quantity,
             * weight, weightType, brand);
             */
        }

    }
}
