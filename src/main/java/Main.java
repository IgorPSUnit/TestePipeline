public class Main {
    public static void main(String[] args) {
        // Definindo variáveis de teste
        int a, b;
        int resultInt;
        double resultDouble;
        double d, e;
        
        // Instanciando a calculadora
        Calculadora calculadora = new Calculadora();
        
        // Atribuindo valores
        a = 4;
        b = 5;
        d = 25;
        e = 3.5;
        
        // Executando operações
        resultInt = calculadora.soma(a, b);
        System.out.println("Soma: " + resultInt);
        
        resultDouble = calculadora.divisaoD(d, e);
        System.out.println("Divisão decimal: " + resultDouble);
    }
}
