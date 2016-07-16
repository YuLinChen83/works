import java.util.Scanner;
import java.math.BigInteger;

class test5 {
	public static void main(String[] args) {
		System.out.print("Please input a string to reversed: ");
		Scanner input = new Scanner(System.in);
		BigInteger a = new BigInteger(input.nextInt() + "");
		BigInteger b = new BigInteger(input.nextInt() + "");
		BigInteger sum = a.add(b);
		System.out.println(sum.toString());
	}
}