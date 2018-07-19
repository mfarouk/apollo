package com.react.mongo.app.apollo.repository;

/**
 * Created by farouk on 7/18/18.
 */
import com.react.mongo.app.apollo.model.Contact;
import org.springframework.data.repository.CrudRepository;

public interface ContactRepository extends CrudRepository<Contact, String> {
    @Override
    void delete(Contact deleted);
}
