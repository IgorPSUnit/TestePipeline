import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
public class CalculadoraTest {
    @Test
    public void somaDoisNumeros() {
        Calculadora calc = new Calculadora();
        int soma = calc.soma(10,40);
        Assertions.assertEquals(50, soma);
    }
    @Test
    public void subtraiDoisNumeros() {
        Calculadora calc = new Calculadora();
        int subtrai = calc.subtracao(50,40);
        Assertions.assertEquals(10, subtrai);
    }
    @Test
    public void multiplicaDoisNumeros() {
        Calculadora calc = new Calculadora();
        int multiplica = calc.multiplicacao(10,40);
        Assertions.assertEquals(400, multiplica);
    }
    @Test
    public void divideDoisNumeros() {
        Calculadora calc = new Calculadora();
        int divisao = calc.divisao(80,40);
        Assertions.assertEquals(2, divisao);
    }
    @Test
    public void divideDoisNumerosD(){
        Calculadora calc = new Calculadora();
        Double divisao = calc.divisaoD(20,40);
        Assertions.assertEquals(0.5, divisao);
    }

    @Test
    public void verificaPar(){
        Calculadora calc = new Calculadora();
        boolean verifica = calc.ePar(6);
        Assertions.assertTrue(verifica);
    }
}
