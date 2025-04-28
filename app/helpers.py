import random
from .data import adjectives, nouns

def validation_errors_to_error_messages(validation_errors):
    """
    Turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}: {error}')
    return errorMessages


def get_random_username():
    # Choose random adjective and noun
    adjective = random.choice(adjectives).capitalize()
    noun = random.choice(nouns).capitalize()
    # Choose a random number between 1 and 9999
    num = random.randint(1, 9999)
    # Define several formats similar to your JavaScript code
    formats = [
        f"{adjective}-{noun}-{num}",
        f"{adjective}_{noun}_{num}",
        f"{adjective}_{noun}{num}",
        f"{adjective}-{noun}{num}",
        f"{adjective}{noun}{num}",
    ]
    return random.choice(formats)
