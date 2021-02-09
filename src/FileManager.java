import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

public class FileManager {

    public String fileName;
    // public ArrayList<Item> items;

    public FileManager(String fileName) {
        this.fileName = fileName;
    }

    // ArrayList<Item>
    public void readFile() throws FileNotFoundException {

        Scanner fileData = new Scanner(new File(this.fileName));

        System.out.println("File name: " + this.fileName);

        System.out.println(fileData.nextLine());

        while (fileData.hasNext()) {

            String fileLine = fileData.nextLine();

            String[] itemParts = fileLine.split(",");

            String productId = itemParts[0];
            String productName = itemParts[1];
            double price = Double.parseDouble(itemParts[2]);
            String category = itemParts[3];
            int quantity = Integer.parseInt(itemParts[4]);
            double weight = Double.parseDouble(itemParts[5]);
            String weightType = itemParts[6];
            String brand = itemParts[7];

            System.out.printf("%s %10s %10f %10s %10d %10f %10s %10s %n", productId, productName, price, category,
                    quantity, weight, weightType, brand);

            // Item newItem = new Item(productId, productName, price, category, quantity,
            // weight, weightType, brand);
        }

    }
}
