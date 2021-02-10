import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

public class FileManager {

    public String fileName;
    // public ArrayList<Item> items = new ArrayList<Item>();

    public FileManager(String fileName) {
        this.fileName = fileName;
    }

    // ArrayList<Item>
    public void readFile() throws IOException {

        // Prints line that should have headers, will remove later
        BufferedReader fileData = new BufferedReader(new FileReader(this.fileName));
        System.out.println(fileData.readLine());

        // reads second line
        String fileLine = fileData.readLine();

        // checks if the current line is null
        while (fileLine != null) {

            String[] itemParts = fileLine.split(",");

            String productId = itemParts[0];
            String productName = itemParts[1];
            double price = Double.parseDouble(itemParts[2]);
            String category = itemParts[3];
            int quantity = Integer.parseInt(itemParts[4]);
            double weight = Double.parseDouble(itemParts[5]);
            String weightType = itemParts[6];
            String brand = itemParts[7];

            // retrieves next line
            fileLine = fileData.readLine();

            // This line is used to print the line to the console, to test if it's read properly
            /*
             * System.out.printf("%s %10s %10f %10s %10d %10f %10s %10s %n", productId,
             * productName, price, category, quantity, weight, weightType, brand);
             */

            // This line is used to create a new object when the backend connection is made
            /*
             * Item newItem = new Item(productId, productName, price, category, quantity,
             * weight, weightType, brand);
             * 
             * items.add(newItem);
             * 
             */

        }

        fileData.close();
        // return items;
    }

    // METHOD WILL BE UNCOMMENTED WHEN FIELDS ARE APPROVED BY BACKEND TEAM AND CONNECTION IS READY

     /* public void writeFile(ArrayList<String> items) throws IOException {
        BufferedWriter fileData = new BufferedWriter(new FileWriter(this.fileName));

        for (int i = 0; i < items.size(); i++) {

            Item item = items.get(i);
            
            String productId = (String) item.getProductId();
            String productName = item.getProductName();
            String price = (String) item.getPrice();
            String category = item.getCategory();
            String quantity = (String) item.getQuantity();
            String weight = (String) item.getWeight();
            String weightType = item.getWeightType();
            String brand = item.getBrand();

            fileData.write(productId + "," + productName + "," + price + "," + category 
            + "," + quantity + "," + weight + "," + weightType + "," + brand);
            
            fileData.newLine();
        }

        fileData.close();
    }
    */
    
}
