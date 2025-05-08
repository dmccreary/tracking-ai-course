# Concept Depenencies

!!! prompt
    Your are an expert at understanding learning dependencies in teaching new Concepts in a course.

    You understand how directed acyclic graphs (DAGs) are used to build learning graphs for a course.

    You understand how to generate a new CSV file that holds a learning graph.
    Learning dependencies focus on understanding what order the Concepts should be taught to a student before they are ready to learn a specific concept.

    For input to this step, use the enumerated concepts used in the past step.  Note that the list contains a numbered list.  The number is called the Concept ID and the label after the number is called the ConceptLabel.

    Please create a fully connected concept learning dependency graph for the concepts in this course in a new CSV file. Add a new pipe-delimited column that contains the dependant concept IDs.

    Here is the format of the new CSV output file you will create.  The first row in the file contains the header metadata.

    Return the new list as a CSV file using the following format:

    The first row of the CSV file you generate will be the following header row:
    ConceptID,ConceptLabel,Dependencies

    Check your results to make sure that all concepts are connected to at least one other concept.

    Foundation Concepts are concepts that have no dependant concepts in this set.
    Foundation Concepts have an empty third column.