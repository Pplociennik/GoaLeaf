package com.goaleaf.repositories;

import com.goaleaf.entities.Comment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Integer> {

    Iterable<Comment> getAllByPostIDOrderByCreationDateDesc(Integer postID);

    Comment findById(Integer commentID);

    @Override
    void delete(Iterable<? extends Comment> entities);

    //    Comment save(Comment comment);
}
