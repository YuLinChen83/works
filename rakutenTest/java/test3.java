import java.util.Scanner;
class test3 {
	public static void main(String[] args) {
    System.out.print("Please input a positive integer to compute it's square root(int): ");
		Scanner input = new Scanner(System.in);
		int s = input.nextInt();
		double num = Math.sqrt(s);
		System.out.println((int)num);
	}
}