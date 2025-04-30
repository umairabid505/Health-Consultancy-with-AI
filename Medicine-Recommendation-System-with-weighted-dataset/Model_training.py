# Importing necessary libraries
import pandas as pd  # For data manipulation and loading the CSV
from sklearn.model_selection import train_test_split  # To split the dataset into training and testing sets
from sklearn.preprocessing import LabelEncoder  # To convert categorical labels (diseases) into numeric form
from sklearn.ensemble import RandomForestClassifier  # The machine learning model we're using
from joblib import dump  # To save the trained model for future use

# Load the dataset from the specified CSV file
dataset = pd.read_csv('dataset/augmented_disease_symptoms_dataset_updated2.csv')

# Separate the input features (symptoms) from the target column (prognosis)
symptoms_col = dataset.drop('prognosis', axis=1)  # Drop 'prognosis' column to keep only symptom columns
disease_col = dataset['prognosis']  # Target variable (labels) - the disease to be predicted

# Encode the categorical disease names into numeric labels
le = LabelEncoder()  # Create a LabelEncoder instance
le.fit(disease_col)  # Fit the encoder to the disease labels
labeled_diseases = le.transform(disease_col)  # Transform disease names into numeric values
print(labeled_diseases)  # Optional: Print the encoded labels for verification

# Split the dataset into training and testing sets (70% train, 30% test)
X_train, X_test, y_train, y_test = train_test_split(
    symptoms_col,              # Input features
    labeled_diseases,          # Encoded target labels
    test_size=0.3,             # 30% of the data is reserved for testing
    random_state=20            # Seed value for reproducibility of results
)

# Initialize the Random Forest Classifier
RandomForest = RandomForestClassifier(
    n_estimators=100,  # Number of trees in the forest (more trees = better accuracy but more computation)
    random_state=42    # Seed for consistent results every time the code is run
)

# Train the model on the training data
RandomForest.fit(X_train, y_train)

# Save the trained model to a file using joblib for later use (like prediction in production)
dump(RandomForest, 'RandomForest2.joblib')
