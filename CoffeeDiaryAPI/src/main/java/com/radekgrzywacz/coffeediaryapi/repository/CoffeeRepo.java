import org.springframework.data.jpa.repository.JpaRepository;

import com.radekgrzywacz.coffeediaryapi.entity.Coffee;

public interface CoffeeRepo extends JpaRepository<Coffee, Integer> {

}
