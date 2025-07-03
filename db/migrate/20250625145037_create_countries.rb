class CreateCountries < ActiveRecord::Migration[8.0]
  def change
    create_table :countries do |t|
      t.string :code
      t.string :name
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
