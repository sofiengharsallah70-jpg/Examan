package stepdefinitions;

import io.cucumber.java.en.*;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.*;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import static org.junit.Assert.assertTrue;

import java.io.File;
import java.time.Duration;

public class StudentCreationSteps {
    WebDriver driver;

    @Given("l'utilisateur est sur la page {string}")
    public void userOnHomePage(String fileName) {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage"); // Requis pour GitHub Actions
        driver = new ChromeDriver(options);
        
        fileName = "src\\main\\resources\\static\\" + fileName;
        File file = new File(fileName);
        driver.get("file:///" + file.getAbsolutePath());
    }

    @When("il remplit le champ {string} avec {string}")
    public void fillField(String fieldId, String value) {
        driver.findElement(By.id(fieldId)).sendKeys(value);
    }

    @When("il sélectionne le programme {string}")
    public void selectProgram(String value) {
        Select select = new Select(driver.findElement(By.id("program")));
        select.selectByValue(value);
    }

    @When("il clique sur le bouton {string}")
    public void clickSubmitButton(String buttonName) {
        // En cherchant par ID directement pour eviter les soucis de nom de bouton multi-langues
        driver.findElement(By.id("submit-btn")).click();
    }

    @Then("le message de succès doit s'afficher")
    public void verifySuccessMessage() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement toast = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("toast")));
        
        assertTrue("Le toast de succès n'est pas affiché", toast.getAttribute("class").contains("show"));
        driver.quit();
    }
}
